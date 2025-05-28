import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

class LiquidLightSystem {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mousePos = { x: 0, y: 0 };
    this.scrollPos = 0;
    this.time = 0;
    this.isActive = true;
    
    // Performance optimization
    this.deviceCapability = this.assessDeviceCapability();
    this.particleCount = this.deviceCapability.memory > 4 ? 150 : 75;
    
    this.init();
  }

  assessDeviceCapability() {
    return {
      memory: navigator.deviceMemory || 4,
      cores: navigator.hardwareConcurrency || 4,
      pixelRatio: Math.min(window.devicePixelRatio, 2)
    };
  }

  init() {
    this.setupCanvas();
    this.createParticles();
    this.setupEventListeners();
    this.setupScrollTriggers();
    this.animate();
  }

  setupCanvas() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.opacity = '0.8';
    
    this.resize();
    this.container.appendChild(this.canvas);
    
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const dpr = this.deviceCapability.pixelRatio;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
    this.ctx.scale(dpr, dpr);
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      hue: Math.random() * 60 + 180, // Blue to cyan range
      brightness: Math.random() * 40 + 60,
      life: Math.random() * 1000 + 500,
      maxLife: Math.random() * 1000 + 500,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      connections: []
    };
  }

  setupEventListeners() {
    // Mouse tracking for particle attraction
    window.addEventListener('mousemove', (e) => {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;
    });

    // Scroll tracking for liquid flow
    window.addEventListener('scroll', () => {
      this.scrollPos = window.pageYOffset;
    });

    // Performance optimization - pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
      this.isActive = !document.hidden;
    });
  }

  setupScrollTriggers() {
    // Create liquid morphing effects on scroll
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress;
        this.updateLiquidFlow(progress);
      }
    });

    // Section-specific particle behaviors
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => this.activateSectionEffect(index),
        onLeave: () => this.deactivateSectionEffect(index)
      });
    });
  }

  updateLiquidFlow(progress) {
    // Modify particle behavior based on scroll position
    this.particles.forEach(particle => {
      particle.flowInfluence = progress;
      particle.vx += Math.sin(progress * Math.PI * 2) * 0.01;
      particle.vy += Math.cos(progress * Math.PI * 2) * 0.01;
    });
  }

  activateSectionEffect(sectionIndex) {
    const effects = [
      () => this.createRippleEffect(), // Hero section
      () => this.createStatsBurst(), // Stats section
      () => this.createServiceFlow(), // Services section
      () => this.createCalculatorField(), // Calculator section
      () => this.createTestimonialGlow() // Testimonials section
    ];

    if (effects[sectionIndex]) {
      effects[sectionIndex]();
    }
  }

  deactivateSectionEffect(sectionIndex) {
    // Gradually return to normal state
    gsap.to(this.particles, {
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        this.particles.forEach(particle => {
          particle.sectionEffect = Math.max(0, (particle.sectionEffect || 0) - 0.02);
        });
      }
    });
  }

  createRippleEffect() {
    // Create expanding ripple from center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const distance = 50 + i * 10;
      
      const rippleParticle = {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        vx: Math.cos(angle) * 2,
        vy: Math.sin(angle) * 2,
        size: 6,
        opacity: 0.8,
        hue: 200,
        brightness: 80,
        life: 100,
        maxLife: 100,
        isRipple: true
      };
      
      this.particles.push(rippleParticle);
      
      // Animate ripple expansion
      gsap.to(rippleParticle, {
        size: 0,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          const index = this.particles.indexOf(rippleParticle);
          if (index > -1) this.particles.splice(index, 1);
        }
      });
    }
  }

  createStatsBurst() {
    // Burst effect for statistics section
    this.particles.forEach(particle => {
      if (Math.random() < 0.3) {
        particle.sectionEffect = 1;
        particle.burstVx = (Math.random() - 0.5) * 4;
        particle.burstVy = (Math.random() - 0.5) * 4;
        particle.originalSize = particle.size;
        
        gsap.to(particle, {
          size: particle.size * 2,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
      }
    });
  }

  createServiceFlow() {
    // Flowing effect for services section
    this.particles.forEach(particle => {
      particle.flowDirection = Math.random() * Math.PI * 2;
      particle.flowStrength = Math.random() * 2 + 1;
    });
  }

  createCalculatorField() {
    // Electromagnetic field effect for calculator
    const fieldCenter = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.6
    };

    this.particles.forEach(particle => {
      const dx = fieldCenter.x - particle.x;
      const dy = fieldCenter.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 300) {
        particle.fieldEffect = 1 - (distance / 300);
        particle.fieldAngle = Math.atan2(dy, dx);
      }
    });
  }

  createTestimonialGlow() {
    // Gentle glow effect for testimonials
    this.particles.forEach(particle => {
      if (Math.random() < 0.5) {
        particle.glowEffect = 1;
        gsap.to(particle, {
          brightness: 90,
          opacity: 0.9,
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      }
    });
  }

  updateParticles() {
    this.time += 0.016; // Assuming 60fps
    
    this.particles.forEach((particle, index) => {
      // Basic movement
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Apply scroll influence
      if (particle.flowInfluence) {
        particle.x += Math.sin(this.time + particle.y * 0.01) * particle.flowInfluence;
        particle.y += this.scrollPos * 0.01;
      }
      
      // Mouse attraction
      const dx = this.mousePos.x - particle.x;
      const dy = this.mousePos.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const force = (150 - distance) / 150;
        particle.vx += (dx / distance) * force * 0.01;
        particle.vy += (dy / distance) * force * 0.01;
      }
      
      // Apply section effects
      if (particle.sectionEffect) {
        if (particle.burstVx) {
          particle.vx += particle.burstVx * particle.sectionEffect * 0.1;
          particle.vy += particle.burstVy * particle.sectionEffect * 0.1;
        }
        
        if (particle.flowDirection !== undefined) {
          particle.vx += Math.cos(particle.flowDirection) * particle.flowStrength * 0.05;
          particle.vy += Math.sin(particle.flowDirection) * particle.flowStrength * 0.05;
        }
        
        if (particle.fieldEffect) {
          const fieldForce = particle.fieldEffect * 0.02;
          particle.vx += Math.cos(particle.fieldAngle + Math.PI/2) * fieldForce;
          particle.vy += Math.sin(particle.fieldAngle + Math.PI/2) * fieldForce;
        }
      }
      
      // Velocity damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Boundary wrapping
      if (particle.x < -50) particle.x = window.innerWidth + 50;
      if (particle.x > window.innerWidth + 50) particle.x = -50;
      if (particle.y < -50) particle.y = window.innerHeight + 50;
      if (particle.y > window.innerHeight + 50) particle.y = -50;
      
      // Life cycle
      particle.life--;
      if (particle.life <= 0 && !particle.isRipple) {
        this.particles[index] = this.createParticle();
      }
      
      // Pulsing effect
      particle.currentSize = particle.size + Math.sin(this.time * particle.pulseSpeed) * 0.5;
    });
  }

  drawConnections() {
    // Draw connections between nearby particles
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const opacity = (100 - distance) / 100 * 0.3;
          
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `hsla(${(p1.hue + p2.hue) / 2}, 70%, 70%, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  drawParticles() {
    this.particles.forEach(particle => {
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.currentSize || particle.size
      );
      
      gradient.addColorStop(0, `hsla(${particle.hue}, 70%, ${particle.brightness}%, ${particle.opacity})`);
      gradient.addColorStop(1, `hsla(${particle.hue}, 70%, ${particle.brightness}%, 0)`);
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.currentSize || particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    });
  }

  render() {
    // Clear canvas with slight trail effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    
    // Draw connections first (behind particles)
    this.drawConnections();
    
    // Draw particles
    this.drawParticles();
  }

  animate() {
    if (!this.isActive) {
      requestAnimationFrame(() => this.animate());
      return;
    }
    
    this.updateParticles();
    this.render();
    
    requestAnimationFrame(() => this.animate());
  }

  // Theme switching
  switchTheme(theme) {
    const hueShift = theme === 'dark' ? 60 : 0; // Shift to warmer colors in dark mode
    const brightnessMultiplier = theme === 'dark' ? 0.7 : 1;
    
    this.particles.forEach(particle => {
      gsap.to(particle, {
        hue: particle.hue + hueShift,
        brightness: particle.brightness * brightnessMultiplier,
        duration: 1.5,
        ease: "power2.inOut"
      });
    });
  }

  destroy() {
    this.isActive = false;
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}

export default LiquidLightSystem;
