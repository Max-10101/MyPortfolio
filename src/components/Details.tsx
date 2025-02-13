import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Details.css';

interface ContentData {
  content: string;
  last_modified: string;
}

interface Skill {
  name: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface Skills {
  categories: SkillCategory[];
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const defaultSkills: Skills = {
  categories: [
    {
      title: "Front-end",
      skills: [
        { name: "React & TypeScript" },
        { name: "HTML5 & CSS3" },
        { name: "JavaScript ES6+" },
        { name: "Responsive Design" }
      ]
    },
    {
      title: "Design",
      skills: [
        { name: "UI/UX Design" },
        { name: "Animations CSS" },
        { name: "Design System" },
        { name: "Prototypage" }
      ]
    },
    {
      title: "Outils",
      skills: [
        { name: "Git & GitHub" },
        { name: "VS Code" },
        { name: "Figma" },
        { name: "NPM" }
      ]
    }
  ]
};

const Details: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [parcoursContent, setParcoursContent] = useState('');
  const [skills, setSkills] = useState<Skills>(defaultSkills);
  const { isAuthenticated } = useAuth();

  const loadContent = async () => {
    try {
      const responseParcours = await axios.get<ContentData>(`${API_URL}/api/content/parcours`, {
        withCredentials: true
      });
      setParcoursContent(responseParcours.data.content || '');

      const responseSkills = await axios.get<ContentData>(`${API_URL}/api/content/skills`, {
        withCredentials: true
      });
      if (responseSkills.data.content) {
        setSkills(JSON.parse(responseSkills.data.content));
      }
    } catch (error) {
      console.error('Erreur lors du chargement du contenu:', error);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleSaveParcours = async () => {
    try {
      await axios.put(
        `${API_URL}/api/content/parcours`,
        { content: parcoursContent },
        { withCredentials: true }
      );
      await loadContent();
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
    }
  };

  const handleSaveSkills = async () => {
    try {
      await axios.put(
        `${API_URL}/api/content/skills`,
        { content: JSON.stringify(skills) },
        { withCredentials: true }
      );
      await loadContent();
      setIsEditingSkills(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des compétences:', error);
      alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
    }
  };

  const handleAddSkill = (categoryIndex: number) => {
    const newSkills = { ...skills };
    newSkills.categories[categoryIndex].skills.push({ name: "Nouvelle compétence" });
    setSkills(newSkills);
  };

  const handleRemoveSkill = (categoryIndex: number, skillIndex: number) => {
    const newSkills = { ...skills };
    newSkills.categories[categoryIndex].skills.splice(skillIndex, 1);
    setSkills(newSkills);
  };

  const handleUpdateSkill = (categoryIndex: number, skillIndex: number, newName: string) => {
    const newSkills = { ...skills };
    newSkills.categories[categoryIndex].skills[skillIndex].name = newName;
    setSkills(newSkills);
  };

  const handleUpdateCategoryTitle = (categoryIndex: number, newTitle: string) => {
    const newSkills = { ...skills };
    newSkills.categories[categoryIndex].title = newTitle;
    setSkills(newSkills);
  };

  return (
    <section className="details-section">
      <div className="hero-stars"></div>
      
      <Link to="/about" className="back-button">
        <span className="back-arrow">←</span>
      </Link>
      <div className="details-content">
        <h1 className="section-title">Qui suis-je ?</h1>
        <div className="details-grid">
          <div className="details-item">
            <h2>Mon Parcours</h2>
            {isEditing ? (
              <div className="edit-content">
                <textarea
                  value={parcoursContent}
                  onChange={(e) => setParcoursContent(e.target.value)}
                  rows={5}
                />
                <div className="edit-buttons">
                  <button onClick={handleSaveParcours}>Sauvegarder</button>
                  <button onClick={() => setIsEditing(false)}>Annuler</button>
                </div>
              </div>
            ) : (
              <>
                <p>{parcoursContent}</p>
                {isAuthenticated && (
                  <button 
                    className="edit-button"
                    onClick={() => setIsEditing(true)}
                  >
                    Modifier
                  </button>
                )}
              </>
            )}
          </div>
          <div className="details-item">
            <h2>Mes Compétences</h2>
            <div className="skills-categories">
              {skills.categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="skills-category">
                  {isEditingSkills ? (
                    <input
                      type="text"
                      value={category.title}
                      onChange={(e) => handleUpdateCategoryTitle(categoryIndex, e.target.value)}
                      className="category-title-input"
                    />
                  ) : (
                    <h3>{category.title}</h3>
                  )}
                  <ul className="skills-list">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex}>
                        {isEditingSkills ? (
                          <div className="skill-edit">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => handleUpdateSkill(categoryIndex, skillIndex, e.target.value)}
                              className="skill-input"
                            />
                            <button
                              onClick={() => handleRemoveSkill(categoryIndex, skillIndex)}
                              className="remove-skill"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          skill.name
                        )}
                      </li>
                    ))}
                    {isEditingSkills && (
                      <li className="add-skill">
                        <button onClick={() => handleAddSkill(categoryIndex)}>
                          + Ajouter une compétence
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
            {isAuthenticated && (
              <div className="skills-edit-buttons">
                {isEditingSkills ? (
                  <div className="edit-buttons">
                    <button onClick={handleSaveSkills}>Sauvegarder</button>
                    <button onClick={() => setIsEditingSkills(false)}>Annuler</button>
                  </div>
                ) : (
                  <button 
                    className="edit-button"
                    onClick={() => setIsEditingSkills(true)}
                  >
                    Modifier les compétences
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
