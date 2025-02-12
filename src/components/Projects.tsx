import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css/bundle';

import '../styles/Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Projet 1",
    description: "Description du projet 1",
    image: "/project1.jpg",
    technologies: ["React", "TypeScript", "CSS"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Projet 2",
    description: "Description du projet 2",
    image: "/project2.jpg",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Projet 3",
    description: "Description du projet 3",
    image: "/project3.jpg",
    technologies: ["React", "Firebase", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#"
  }
];

const Projects: React.FC = () => {
  return (
    <section className="projects-section">
      <div className="hero-stars"></div>
      <div className="hero-mountains"></div>
      <Link to="/" className="back-button">
        <span className="back-arrow">←</span>
      </Link>
      <div className="projects-content">
        <h1 className="section-title">Mes Projets</h1>
        <div className="projects-carousel">
          <Swiper
            effect={'fade'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            loop={true}
            speed={1000}
            spaceBetween={0}
            fadeEffect={{
              crossFade: true
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[EffectFade, Pagination, Navigation]}
            className="mySwiper"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="project-card">
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.technologies.map((tech, index) => (
                        <span key={index}>{tech}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.liveUrl && (
                        <a href={project.liveUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                          Voir le site
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      )}
                    </div>
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
