import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { useAuth } from '../context/AuthContext';
import { Project } from '../types/project';
import { getProjects, updateProject } from '../services/projectService';

// Import Swiper styles
import 'swiper/css/bundle';

import '../styles/Projects.css';

const Projects: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({});
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newTechnology, setNewTechnology] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const savedProjects = await getProjects();
      setProjects(savedProjects);
    } catch (err) {
      setError('Erreur lors du chargement des projets');
      console.error('Erreur lors du chargement des projets:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    projects.forEach(project => {
      const img = new Image();
      img.onload = () => {
        console.log(`Image chargée avec succès: /${project.imagePath}`);
        setImagesLoaded(prev => ({ ...prev, [project.id]: true }));
      };
      img.onerror = () => {
        console.error(`Erreur de chargement de l'image: /${project.imagePath}`);
        setImagesLoaded(prev => ({ ...prev, [project.id]: false }));
      };
      img.src = `/${project.imagePath}`;
      console.log(`Tentative de chargement de l'image: /${project.imagePath}`);
    });
  }, [projects]);

  const handleEditClick = (project: Project) => {
    setEditingProject({ ...project });
  };

  const handleSaveClick = async () => {
    if (editingProject) {
      try {
        setError(null);
        await updateProject(editingProject);
        await loadProjects(); // Recharger tous les projets pour être sûr d'avoir les dernières données
        setEditingProject(null);
      } catch (err) {
        setError('Erreur lors de la sauvegarde du projet');
        console.error('Erreur lors de la sauvegarde du projet:', err);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setError(null);
  };

  const handleAddTechnology = () => {
    if (editingProject && newTechnology.trim()) {
      setEditingProject({
        ...editingProject,
        technologies: [...editingProject.technologies, newTechnology.trim()]
      });
      setNewTechnology('');
    }
  };

  const handleRemoveTechnology = (techToRemove: string) => {
    if (editingProject) {
      setEditingProject({
        ...editingProject,
        technologies: editingProject.technologies.filter(tech => tech !== techToRemove)
      });
    }
  };

  if (isLoading) {
    return (
      <section className="projects-section" id="projects">
        <div className="loading">Chargement des projets...</div>
      </section>
    );
  }

  return (
    <section className="projects-section" id="projects">
      <div className="hero-stars"></div>
      
      <Link to="/" className="back-button">
        <span className="back-arrow">←</span>
      </Link>
      <div className="projects-content">
        <h2 className="section-title">Mes Projets</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="projects-carousel">
          <Swiper
            modules={[Navigation, Pagination, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            effect="fade"
            loop={true}
            className="mySwiper"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="project-card">
                  <div className="project-image">
                    <img
                      src={`/${project.imagePath}`}
                      alt={project.title}
                      style={{ 
                        display: imagesLoaded[project.id] ? 'block' : 'none',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={() => {
                        console.error(`Erreur de chargement de l'image dans le rendu: /${project.imagePath}`);
                        setImagesLoaded(prev => ({ ...prev, [project.id]: false }));
                      }}
                    />
                    {!imagesLoaded[project.id] && (
                      <div className="image-placeholder">
                        Image non disponible
                        <br />
                        Chemin: /{project.imagePath}
                      </div>
                    )}
                  </div>
                  <div className="project-info">
                    {editingProject?.id === project.id ? (
                      <div className="edit-form">
                        <input
                          type="text"
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            title: e.target.value
                          })}
                          className="edit-input"
                        />
                        <textarea
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            description: e.target.value
                          })}
                          className="edit-textarea"
                        />
                        <div className="technologies-edit">
                          <div className="current-technologies">
                            {editingProject.technologies.map((tech) => (
                              <div key={tech} className="tech-tag">
                                {tech}
                                <button
                                  onClick={() => handleRemoveTechnology(tech)}
                                  className="remove-tech"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="add-technology">
                            <input
                              type="text"
                              value={newTechnology}
                              onChange={(e) => setNewTechnology(e.target.value)}
                              placeholder="Nouvelle technologie"
                              className="tech-input"
                            />
                            <button
                              onClick={handleAddTechnology}
                              className="add-tech-btn"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="edit-actions">
                          <button onClick={handleSaveClick} className="save-btn">
                            Enregistrer
                          </button>
                          <button onClick={handleCancelEdit} className="cancel-btn">
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="technologies">
                          {project.technologies.map((tech, index) => (
                            <span key={index} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                        {isAuthenticated && (
                          <button
                            onClick={() => handleEditClick(project)}
                            className="edit-btn"
                          >
                            Modifier
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Projects;
