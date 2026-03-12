import React, { useState, useEffect, useCallback } from "react";
import "./Carousel.css";

const Carousel = ({ autoplay = true, autoplayDelay = 3000, pauseOnHover = true }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [dragStart, setDragStart] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // UPDATED CARDS WITH YOUR CUSTOM TITLES AND IMAGE PLACEHOLDERS
  const cards = [
    { 
      id: 1, 
      title: "Portfolio Website", 
      image: "src/assets/portfolio.jpg", // REPLACE WITH YOUR IMAGE PATH
      description: "A sleek, high-performance personal brand platform. It features a custom-engineered 3D carousel, glassmorphism UI design, and smooth GSAP-driven scrolling for a modern, immersive user experience.",
      tech: ["React.js", "CSS3", "GSAP", "Lucide React"]
    },
    { 
      id: 2, 
      title: "Yubi's ToyShop CMS", 
      image: "src/assets/Yubis.png", // REPLACE WITH YOUR IMAGE PATH
      description: "A comprehensive Content Management System designed for the physical store Yubi's Toy Shop to manage inventory and sales.",
      tech: ["JavaScript", "Figma", "Tailwind", "PHP", "Laravel", "Node.js"]
    },
    { 
      id: 3, 
      title: "PAW FEEDS System", 
      image: "src/assets/pawfeeds.jpg", // REPLACE WITH YOUR IMAGE PATH
      description: "A smart IoT-based Automated Dog Feeder, maintains good feeding schedule and streams live video on the mobile application.",
      tech: ["React", "Node.js", "IoT-Based", "Hardware"]
    }
  ];

  const handleNext = useCallback(() => setIndex((prev) => (prev + 1) % cards.length), [cards.length]);
  const handlePrev = useCallback(() => setIndex((prev) => (prev - 1 + cards.length) % cards.length), [cards.length]);

  const onMouseDown = (e) => { setDragStart(e.clientX); setIsDragging(true); };
  const onMouseMove = (e) => {
    if (!isDragging || dragStart === null) return;
    const distance = dragStart - e.clientX;
    if (distance > 70) { handleNext(); setIsDragging(false); } 
    else if (distance < -70) { handlePrev(); setIsDragging(false); }
  };

  return (
    <div className="carousel-master-container">
      <div 
        className="react-bits-carousel"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={() => setIsDragging(false)}
      >
        <div className="carousel-inner">
          {cards.map((card, i) => {
            let offset = i - index;
            if (offset > cards.length / 2) offset -= cards.length;
            if (offset < -cards.length / 2) offset += cards.length;
            const absOffset = Math.abs(offset);
            
            return (
              <div
                key={card.id}
                className={`carousel-card ${offset === 0 ? 'active' : ''}`}
                onClick={() => offset === 0 ? setSelectedProject(card) : setIndex(i)}
                style={{
                  transform: `translateX(${offset * 300}px) translateZ(${-absOffset * 250}px) rotateY(${offset * -45}deg)`,
                  zIndex: 100 - absOffset,
                  opacity: absOffset > 2 ? 0 : 1,
                }}
              >
                <div className="card-visual">
                  <img src={card.image} alt={card.title} draggable="false" />
                  <div className="card-label-box">
                    <p>{card.title}</p>
                    {offset === 0 && <span className="click-hint">Click for Details</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProject(null)}>×</button>
            <div className="modal-body">
              <img src={selectedProject.image} alt={selectedProject.title} className="modal-img" />
              <div className="modal-info">
                <h2>{selectedProject.title}</h2>
                <div className="modal-divider"></div>
                <p className="modal-desc">{selectedProject.description}</p>
                <div className="tech-section">
                  <h4>TECHNOLOGIES</h4>
                  <div className="tech-tags">
                    {selectedProject.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;