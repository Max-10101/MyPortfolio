import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import pool from '../config/database.js';

const router = express.Router();

// Obtenir le contenu d'une section
router.get('/:section', async (req, res) => {
  console.log(`GET request for section: ${req.params.section}`);
  try {
    console.log('Executing database query...');
    const [rows] = await pool.execute(
      'SELECT * FROM content WHERE section = ?',
      [req.params.section]
    );
    console.log('Query result:', rows);
    
    if (rows.length === 0) {
      console.log('No content found, getting default content');
      // Si le contenu n'existe pas, créer un contenu par défaut
      const defaultContent = getDefaultContent(req.params.section);
      console.log('Default content:', defaultContent ? 'content exists' : 'no default content');
      
      if (defaultContent) {
        console.log('Inserting default content into database');
        await pool.execute(
          'INSERT INTO content (section, content) VALUES (?, ?)',
          [req.params.section, defaultContent]
        );
        return res.json({ content: defaultContent, last_modified: new Date() });
      }
      // Si pas de contenu par défaut, retourner un contenu vide
      console.log('Returning empty content');
      return res.json({ content: '', last_modified: new Date() });
    }
    
    console.log('Returning existing content');
    res.json(rows[0]);
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState
    });
    res.status(500).json({ 
      message: error.message,
      details: error.sqlMessage || 'Database error'
    });
  }
});

// Modifier le contenu (protégé par authentification)
router.put('/:section', authenticateToken, async (req, res) => {
  console.log(`PUT request for section: ${req.params.section}`);
  const connection = await pool.getConnection();
  try {
    console.log('Starting transaction');
    await connection.beginTransaction();

    const { content } = req.body;
    const section = req.params.section;
    console.log('Content length:', content ? content.length : 0);
    
    // Vérifier si la section existe
    console.log('Checking if section exists');
    const [existingRows] = await connection.execute(
      'SELECT * FROM content WHERE section = ?',
      [section]
    );
    
    if (existingRows.length > 0) {
      console.log('Updating existing content');
      // Mise à jour
      await connection.execute(
        'UPDATE content SET content = ?, last_modified = NOW() WHERE section = ?',
        [content, section]
      );
    } else {
      console.log('Inserting new content');
      // Insertion
      await connection.execute(
        'INSERT INTO content (section, content, last_modified) VALUES (?, ?, NOW())',
        [section, content]
      );
    }
    
    console.log('Committing transaction');
    await connection.commit();
    
    const [updatedRows] = await connection.execute(
      'SELECT * FROM content WHERE section = ?',
      [section]
    );
    
    console.log('Operation completed successfully');
    res.json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error('Error in PUT request:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState
    });
    await connection.rollback();
    res.status(500).json({ 
      success: false, 
      message: error.message,
      details: error.sqlMessage || 'Database error'
    });
  } finally {
    connection.release();
  }
});

// Fonction helper pour obtenir le contenu par défaut d'une section
function getDefaultContent(section) {
  console.log('Getting default content for section:', section);
  const defaults = {
    parcours: 'Découvrez mon parcours dans le développement web et ma passion pour la création d\'interfaces innovantes.',
    competences: 'Mes compétences techniques incluent le développement web frontend et backend.',
    projects: JSON.stringify([
      {
        id: 1,
        title: "Dominos Clicker",
        description: "Un jeu de type 'clicker' inspiré par Cookie Clicker, avec une thématique Domino's Pizza. Le joueur clique pour gagner des pizzas et peut acheter des améliorations pour augmenter sa production. Projet réalisé en équipe avec Jérémy, Laure, Vincent et Maxence.",
        imagePath: "images/dominos.jpg",
        technologies: ["JavaScript", "HTML", "CSS"],
        liveUrl: "https://wildcodeschool-2024-09.github.io/JS-RemoteFR-Vendangeurs-P1-Dominos-Clicker/",
        githubUrl: "https://github.com/WildCodeSchool-2024-09/JS-RemoteFR-Vendangeurs-P1-Dominos-Clicker"
      },
      {
        id: 2,
        title: "Pokédule",
        description: "Une application web qui combine l'univers Pokémon avec un calendrier/planificateur. Les utilisateurs peuvent organiser leurs tâches et rendez-vous dans une interface inspirée de l'univers Pokémon. Développé avec React et déployé sur Vercel.",
        imagePath: "images/pokedule.jpg",
        technologies: ["React", "TypeScript", "CSS", "Vercel"],
        liveUrl: "https://pokedule.vercel.app/",
        githubUrl: "https://github.com/WildCodeSchool-2024-09/Pokedule"
      }
    ])
  };
  return defaults[section] || '';
}

export default router;
