import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('contactSection') contactSection!: ElementRef;
  @ViewChild('socialLinks') socialLinks!: ElementRef;
  @ViewChild('contactForm') formElement!: ElementRef;

  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  ngAfterViewInit() {
    this.animateContactSection();
  }

  private animateContactSection() {
    // Reset inicial de opacidad para asegurar visibilidad
    gsap.set('.contact-section h2, .social-link, .form-group, .submit-btn', {
      opacity: 1,
      visibility: 'visible'
    });

    // Animación del título
    gsap.from('.contact-section h2', {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Animación de los enlaces sociales
    gsap.from('.social-link', {
      x: -30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.3
    });

    // Animación del formulario
    gsap.from('.form-group', {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      delay: 0.5
    });

    // Animación del botón (una sola animación combinada)
    gsap.from('.submit-btn', {
      y: 30,
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)',
      delay: 0.8
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.contactForm);
    // Animación de confirmación
    gsap.to('.submit-btn', {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
    // Aquí puedes implementar la lógica de envío del formulario
  }
}
