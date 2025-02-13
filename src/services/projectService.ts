import axios from 'axios';
import { Project } from '../types/project';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const defaultProjects: Project[] = [
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
];

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<{ content: string }>(`${API_URL}/api/content/projects`, {
      withCredentials: true
    });
    if (response.data.content) {
      return JSON.parse(response.data.content);
    }
    // Si aucun projet n'est sauvegardé, on initialise avec les projets par défaut
    await saveProjects(defaultProjects);
    return defaultProjects;
  } catch (error) {
    console.error('Erreur lors du chargement des projets:', error);
    return defaultProjects;
  }
};

export const saveProjects = async (projects: Project[]): Promise<void> => {
  try {
    await axios.put(
      `${API_URL}/api/content/projects`,
      { content: JSON.stringify(projects) },
      { withCredentials: true }
    );
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des projets:', error);
    throw error;
  }
};

export const updateProject = async (updatedProject: Project): Promise<void> => {
  try {
    const projects = await getProjects();
    const updatedProjects = projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    await saveProjects(updatedProjects);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet:', error);
    throw error;
  }
};
