import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/common/Navbar/Navbar';
import Footer from '../components/common/Footer/Footer';
import Button from '../components/common/Button/Button';
import { getProjectById, getProjectBySlug } from '../data/projects';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project =
    getProjectBySlug(id) ||
    getProjectById(Number.isNaN(Number(id)) ? id : Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="project-details project-details--empty">
          <h1>Project not found</h1>
          <Button variant="primary" onClick={() => navigate('/')}>
            Back to home
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  const hasGithub = project.github && !project.github.includes('yourusername');
  const hasLive = project.live && project.live !== 'null';

  return (
    <>
      <Helmet>
        <title>{project.title} | Mithun V K</title>
        <meta name="description" content={project.description} />
      </Helmet>
      <Navbar />
      <main className="project-details">
        <div className="project-details__container">
          <Link to="/#projects" className="project-details__back">
            ← All projects
          </Link>
          <img src={project.image} alt="" className="project-details__hero" />
          <p className="project-details__meta">
            {project.category}
            {project.duration && ` · ${project.duration}`}
            {project.role && ` · ${project.role}`}
          </p>
          <h1 className="project-details__title">{project.title}</h1>
          <p className="project-details__description">
            {project.fullDescription || project.description}
          </p>

          {project.results?.length > 0 && (
            <section className="project-details__section">
              <h2>Outcomes</h2>
              <ul className="project-details__results">
                {project.results.map((r, i) => (
                  <li key={i}>
                    <strong>{r.value}</strong> {r.label}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.tags?.length > 0 && (
            <section className="project-details__section">
              <h2>Stack</h2>
              <p>{project.tags.join(' · ')}</p>
            </section>
          )}

          <div className="project-details__actions">
            {hasGithub && (
              <Button
                variant="outline"
                onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')}
              >
                Source code
              </Button>
            )}
            {hasLive && (
              <Button
                variant="primary"
                onClick={() => window.open(project.live, '_blank', 'noopener,noreferrer')}
              >
                Live demo
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetails;
