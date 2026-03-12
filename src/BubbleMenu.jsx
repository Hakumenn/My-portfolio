import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './BubbleMenu.css';

export default function BubbleMenu({ items, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleHover = (index, show) => {
    gsap.to(labelRefs.current[index], {
      opacity: show ? 1 : 0,
      x: show ? -15 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  useEffect(() => {
    const bubbles = bubblesRef.current.filter(Boolean);
    if (isOpen) {
      bubbles.forEach((bubble, i) => {
        const radius = 130;
        const angle = (i / (bubbles.length - 1)) * (Math.PI / 2);
        const x = -Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        gsap.to(bubble, {
          opacity: 1, x, y, scale: 1,
          duration: 0.6, ease: "back.out(1.7)", delay: i * 0.05
        });
      });
    } else {
      gsap.to(bubbles, { opacity: 0, x: 0, y: 0, scale: 0, duration: 0.3 });
      gsap.to(labelRefs.current, { opacity: 0, x: 0 });
    }
  }, [isOpen]);

  return (
    <div className="nav-container">
      <button className="menu-trigger" onClick={toggleMenu}>
        <div className="burger-icon">
          <span></span><span></span><span></span>
        </div>
      </button>

      {items.map((item, idx) => (
        <div 
          key={idx} 
          className="menu-item-group"
          ref={el => bubblesRef.current[idx] = el}
          style={{ opacity: 0, transform: 'scale(0)' }}
        >
          <span className="nav-name-label" ref={el => labelRefs.current[idx] = el}>
            {item.label}
          </span>
          <a 
            href={item.href} 
            className="icon-bubble"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.href);
            }}
            onMouseEnter={() => handleHover(idx, true)}
            onMouseLeave={() => handleHover(idx, false)}
          >
            {item.icon}
          </a>
        </div>
      ))}
    </div>
  );
}