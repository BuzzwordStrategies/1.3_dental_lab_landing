import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';

gsap.registerPlugin(ScrollTrigger);

class ThemeController {
  constructor() {
    this.currentTheme = 'light';
    this.isTransitioning = false;
    this.nightParticles = [];
    this.dayParticles = [];
    this.themeElements = new Map();
    
    this.init();
  }

  init() {
    this.setupThemeToggle();
    this.registerThemeElements();
    this.setupAutoThemeDetection();
    this.createThemeTransitionOverlay();
  }

  setupThemeToggle() {
    // Create floating theme toggle button
    const toggleButton = document.createElement('div');
    toggleButton.className = 'theme-toggle-button';
    toggleButton.innerHTML = `
      <div class="toggle-icon">
        <div class="sun-icon">☀️</div>
        <div class="moon-icon">🌙</div>
      </div>
    `;
    
    toggleButton.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    `;

    toggleButton.addEventListener('click', () => this.switchTheme());
    toggleButton.addEventListener('mouseenter', () => {
      gsap.to(toggleButton, { scale: 1.1, duration: 0.3 });
    });
    toggleButton.addEventListener('mouseleave', () => {
      gsap.to(toggleButton, { scale: 1, duration: 0.3 });
    });

    document.body.appendChild(toggleButton);
    this.toggleButton = toggleButton;
  }

  registerThemeElements() {
    // Register elements that need theme-specific animations
    const elements = {
      background: document.body,
      glassPanels: document.querySelectorAll('.glass-panel'),
      textElements: document.querySelectorAll('h1, h2, h3, p'),
      buttons: document.querySelectorAll('button'),
      cards: document.querySelectorAll('.card, .service-card'),
      particles: document.querySelector('.liquid-bg')
    };

    Object.entries(elements).forEach(([key, element]) => {
      this.themeElements.set(key, element);
    });
  }

  setupAutoThemeDetection() {
    // Detect system theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (mediaQuery.matches) {
      this.currentTheme = 'dark';
      this.applyThemeInstantly('dark');
    }

    mediaQuery.addEventListener('change', (e) => {
      if (!this.isTransitioning) {
        this.switchTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  createThemeTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
    `;
    
    document.body.appendChild(overlay);
    this.transitionOverlay = overlay;
  }

  async switchTheme(targetTheme = null) {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    const newTheme = targetTheme || (this.currentTheme === 'light' ? 'dark' : 'light');
    
    // Create dramatic transition effect
    await this.createTransitionEffect(newTheme);
    
    // Apply theme changes
    await this.applyThemeTransition(newTheme);
    
    // Update current theme
    this.currentTheme = newTheme;
    this.isTransitioning = false;
    
    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: newTheme } 
    }));
  }

  async createTransitionEffect(newTheme) {
    const timeline = gsap.timeline();
    
    if (newTheme === 'dark') {
      // Day to night transition
      timeline
        .to(this.transitionOverlay, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut"
        })
        .to('.sun-icon', {
          scale: 0,
          rotation: 180,
          duration: 0.5,
          ease: "back.in(1.7)"
        }, 0)
        .to('.moon-icon', {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "back.out(1.7)"
        }, 0.3);
        
      // Add night-specific effects
      this.addNightParticles();
      this.createStarField();
      
    } else {
      // Night to day transition
      timeline
        .to(this.transitionOverlay, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut"
        })
        .to('.moon-icon', {
          scale: 0,
          rotation: -180,
          duration: 0.5,
          ease: "back.in(1.7)"
        }, 0)
        .to('.sun-icon', {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "back.out(1.7)"
        }, 0.3);
        
      // Remove night effects
      this.removeDarkEffects();
      this.addDayParticles();
    }
    
    return timeline;
  }

  async applyThemeTransition(theme) {
    const timeline = gsap.timeline();
    
    if (theme === 'dark') {
      // Dark theme transitions
      timeline
        .to(document.body, {
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          duration: 1.5,
          ease: "power2.inOut"
        })
        .to('.glass-panel', {
          background: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(100, 200, 255, 0.4)',
          boxShadow: '0 20px 40px rgba(100, 200, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          duration: 1,
          ease: "power2.out"
        }, '-=1')
        .to('h1, h2, h3', {
          color: '#e0e6ed',
          textShadow: '0 0 20px rgba(100, 200, 255, 0.5)',
          duration: 0.8
        }, '-=0.5')
        .to('p, span', {
          color: '#b0b7c3',
          duration: 0.8
        }, '-=0.8')
        .to('button', {
          background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.2), rgba(59, 130, 246, 0.3))',
          borderColor: 'rgba(100, 200, 255, 0.5)',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(100, 200, 255, 0.3)',
          duration: 0.6
        }, '-=0.6');
        
    } else {
      // Light theme transitions
      timeline
        .to(document.body, {
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
          duration: 1.5,
          ease: "power2.inOut"
        })
        .to('.glass-panel', {
          background: 'rgba(255, 255, 255, 0.15)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          duration: 1,
          ease: "power2.out"
        }, '-=1')
        .to('h1, h2, h3', {
          color: '#1a202c',
          textShadow: 'none',
          duration: 0.8
        }, '-=0.5')
        .to('p, span', {
          color: '#4a5568',
          duration: 0.8
        }, '-=0.8')
        .to('button', {
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 1))',
          borderColor: 'rgba(59, 130, 246, 0.8)',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
          duration: 0.6
        }, '-=0.6');
    }
    
    return timeline;
  }

  addNightParticles() {
    // Create floating geometric shapes for dark mode
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'night-particle';
      particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: linear-gradient(45deg, #64b5f6, #42a5f5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        opacity: ${Math.random() * 0.8 + 0.2};
      `;
      
      document.body.appendChild(particle);
      this.nightParticles.push(particle);
      
      // Animate particle movement
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 100
      });
      
      gsap.to(particle, {
        y: -100,
        x: `+=${Math.random() * 200 - 100}`,
        duration: Math.random() * 15 + 10,
        repeat: -1,
        ease: "none",
        delay: Math.random() * 5
      });
      
      // Add pulsing effect
      gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.3,
        scale: Math.random() * 0.5 + 0.8,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }

  createStarField() {
    // Create twinkling stars
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: #ffffff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
      `;
      
      document.body.appendChild(star);
      this.nightParticles.push(star);
      
      // Twinkling animation
      gsap.to(star, {
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    }
  }

  addDayParticles() {
    // Create warm, golden particles for light mode
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'day-particle';
      particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: linear-gradient(45deg, #fbbf24, #f59e0b);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        opacity: ${Math.random() * 0.6 + 0.2};
      `;
      
      document.body.appendChild(particle);
      this.dayParticles.push(particle);
      
      // Gentle floating animation
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      });
      
      gsap.to(particle, {
        y: `+=${Math.random() * 100 - 50}`,
        x: `+=${Math.random() * 100 - 50}`,
        duration: Math.random() * 8 + 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 3
      });
    }
  }

  removeDarkEffects() {
    // Remove night particles and stars
    this.nightParticles.forEach(particle => {
      gsap.to(particle, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }
      });
    });
    this.nightParticles = [];
  }

  removeDayEffects() {
    // Remove day particles
    this.dayParticles.forEach(particle => {
      gsap.to(particle, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }
      });
    });
    this.dayParticles = [];
  }

  applyThemeInstantly(theme) {
    // Apply theme without animation (for initial load)
    document.body.dataset.theme = theme;
    
    if (theme === 'dark') {
      document.body.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)';
      this.addNightParticles();
      this.createStarField();
    } else {
      document.body.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)';
      this.addDayParticles();
    }
  }

  // Public API methods
  getCurrentTheme() {
    return this.currentTheme;
  }

  setTheme(theme) {
    if (theme !== this.currentTheme) {
      this.switchTheme(theme);
    }
  }

  onThemeChange(callback) {
    window.addEventListener('themeChanged', callback);
  }

  destroy() {
    this.removeDarkEffects();
    this.removeDayEffects();
    
    if (this.toggleButton && this.toggleButton.parentNode) {
      this.toggleButton.parentNode.removeChild(this.toggleButton);
    }
    
    if (this.transitionOverlay && this.transitionOverlay.parentNode) {
      this.transitionOverlay.parentNode.removeChild(this.transitionOverlay);
    }
  }
}

// Color Theory Manager for advanced color harmonies
class ColorTheoryManager {
  constructor() {
    this.primaryPalette = {
      light: {
        primary: '#2196F3',
        secondary: '#64B5F6',
        accent: '#00BCD4',
        surface: 'rgba(255, 255, 255, 0.1)',
        text: '#1A1A1A',
        background: '#f8fafc'
      },
      dark: {
        primary: '#1976D2',
        secondary: '#42A5F5',
        accent: '#00ACC1',
        surface: 'rgba(0, 0, 0, 0.3)',
        text: '#E0E6ED',
        background: '#0a0a0a'
      }
    };
    
    this.generateHarmoniousColors();
  }

  generateHarmoniousColors() {
    const baseHue = 210; // Blue base
    
    this.colorSchemes = {
      monochromatic: this.generateMonochromatic(baseHue),
      complementary: this.generateComplementary(baseHue),
      triadic: this.generateTriadic(baseHue),
      analogous: this.generateAnalogous(baseHue)
    };
  }

  generateMonochromatic(hue) {
    return [
      `hsl(${hue}, 70%, 90%)`,
      `hsl(${hue}, 70%, 70%)`,
      `hsl(${hue}, 70%, 50%)`,
      `hsl(${hue}, 70%, 30%)`,
      `hsl(${hue}, 70%, 10%)`
    ];
  }

  generateComplementary(hue) {
    const complement = (hue + 180) % 360;
    return [
      `hsl(${hue}, 70%, 50%)`,
      `hsl(${complement}, 70%, 50%)`
    ];
  }

  generateTriadic(hue) {
    return [
      `hsl(${hue}, 70%, 50%)`,
      `hsl(${(hue + 120) % 360}, 70%, 50%)`,
      `hsl(${(hue + 240) % 360}, 70%, 50%)`
    ];
  }

  generateAnalogous(hue) {
    return [
      `hsl(${(hue - 30) % 360}, 70%, 50%)`,
      `hsl(${hue}, 70%, 50%)`,
      `hsl(${(hue + 30) % 360}, 70%, 50%)`
    ];
  }

  updateIconColors(theme) {
    const colors = this.primaryPalette[theme];
    
    document.querySelectorAll('.icon, .graphic-element').forEach(element => {
      gsap.to(element, {
        filter: `hue-rotate(${this.calculateHueRotation(colors.primary)}) saturate(1.2) brightness(1.1)`,
        duration: 0.5
      });
    });
  }

  calculateHueRotation(color) {
    // Convert color to hue rotation value
    const hue = this.extractHue(color);
    return hue - 210; // Adjust based on base hue
  }

  extractHue(color) {
    // Simple hue extraction (would need more robust implementation)
    if (color.includes('#2196F3')) return 210;
    if (color.includes('#1976D2')) return 210;
    return 0;
  }
}

export { ThemeController, ColorTheoryManager };
export default ThemeController;
