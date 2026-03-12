import { useEffect } from 'react';
import './App.css';
import BubbleMenu from './BubbleMenu';
import ReflectiveCard from './ReflectiveCard';
import Carousel from './Carousel';
import ShinyText from './ShinyText'; 
import { User, Code2, Briefcase, Mail, Facebook, Instagram, Github, Phone } from 'lucide-react'; 
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

function App() {
  const menuItems = [
    { icon: <User size={20} color="#111" />, label: "Introduction", href: "#about" },
    { icon: <Code2 size={20} color="#111" />, label: "Skills", href: "#skills" },
    { icon: <Briefcase size={20} color="#111" />, label: "Projects", href: "#projects" },
    { icon: <Mail size={20} color="#111" />, label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: <Facebook size={20} />, href: "https://www.facebook.com/johnPatrickEstacio.me" },
    { name: "Instagram", icon: <Instagram size={20} />, href: "https://www.instagram.com/buccss_?igsh=NXRqMnVubXJxY3g5" },
    { name: "Github", icon: <Github size={20} />, href: "https://github.com/Hakumenn" },
  ];

  const scrollToSection = (targetId) => {
    gsap.to(window, { duration: 1.2, scrollTo: { y: targetId, autoKill: false }, ease: "power3.inOut" });
  };

  return (
    <div className="portfolio-wrapper">
      {/* Background stays strictly behind everything */}
      <div className="fixed-background">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="grain-overlay"></div>
      </div>

      <BubbleMenu items={menuItems} onNavigate={scrollToSection} />
      
      <section id="about" className="full-page-section intro-section">
        <ReflectiveCard />
        <div className="intro-text-content">
          <ShinyText text="HI GUYS, I AM" speed={3} className="hero-shiny-top" />
          <h1 className="hero-name">JOHN PATRICK</h1>
          <h2 className="hero-subtitle">WEB DEVELOPER // IT STUDENT</h2>
          <div className="about-me-box">
            <p className="about-me-text">
              Passionate IT student of Western Mindanao State University and aspiring Web Developer. 
              I specialize in building clean, interactive digital experiences with a focus 
              on modern UI/UX and efficient backend logic.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="full-page-section dark-section">
        <div className="container">
          <h2 className="section-header">Skills & Tech</h2>
          <div className="content-box">
            <div className="skills-grid">
              {["JavaScript", "Figma", "CSS", "PHP", "React.js"].map((skill, index) => (
                <div key={index} className="skill-box">{skill}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="full-page-section darker-section">
        <div className="wide-container">
          <h2 className="section-header">Project Portfolio</h2>
          <div className="project-display-box">
             <Carousel />
          </div>
        </div>
      </section>

      <section id="contact" className="full-page-section dark-section">
        <div className="container">
          <h2 className="section-header">Contact</h2>
          <div className="content-box contact-flex-container">
            <div className="contact-links-grid">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="contact-icon-box">
                  {social.icon}
                  <span className="contact-label">{social.name}</span>
                </a>
              ))}
            </div>
            <div className="contact-details">
              <div className="detail-item">
                <Mail size={18} className="detail-icon" />
                <span>johnpatrick@email.com</span>
              </div>
              <div className="detail-item">
                <Phone size={18} className="detail-icon" />
                <span>+63 993 565 9893</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;