import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {
  
  ngAfterViewInit() {
    this.animateAboutSection();
  }

  private animateAboutSection() {
    // Animación del título
    gsap.from('.about-section h2', {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Animación del perfil
    gsap.from('.profile-info', {
      x: -100,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });

    // Animación de las habilidades
    gsap.from('.skill-category', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.5,
      ease: 'back.out(1.2)'
    });

    // Animación de los items de habilidades
    gsap.from('.skill-category li', {
      x: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 1,
      ease: 'power2.out'
    });

    // Animación de la experiencia
    gsap.from('.experience-section', {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 1.2,
      ease: 'power3.out'
    });

    // Animación de los items de experiencia
    gsap.from('.experience-section li', {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      delay: 1.5,
      ease: 'back.out(1.7)'
    });
  }
}
