// ...existing imports...
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';
import { emailConfig } from './email.config';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, AfterViewInit {
  @ViewChild('contactSection') contactSection!: ElementRef;
  @ViewChild('socialLinks') socialLinks!: ElementRef;
  @ViewChild('contactForm') formElement!: ElementRef;

  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  // Estados del formulario
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  submitMessage = '';

  constructor(private seoService: SeoService) {
    // Inicializar EmailJS
    emailjs.init(emailConfig.publicKey);
  }

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Contacto',
      description: 'Ponte en contacto con Raúl Báez (Liyodev). Colaboremos juntos en tu próximo proyecto de desarrollo web o videojuegos. Formulario directo y redes sociales.',
      keywords: 'contacto Liyodev, colaboración desarrollador, proyectos web, desarrollo videojuegos, freelance developer',
      image: 'https://liyodev.web.app/completo_icon-512x512.png'
    });
  }


  /** Botones del carrusel (móvil) */
  scrollCarousel(dir: number): void {
    const el = document.getElementById('contactCarousel');
    if (!el) return;
    const firstSlide = el.querySelector('.carousel-slide') as HTMLElement | null;
    const step = firstSlide ? firstSlide.offsetWidth + 16 : Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }

  ngAfterViewInit() {
    this.animateContactSection();
  }

  private animateContactSection() {
    // Reset inicial de opacidad para asegurar visibilidad
    gsap.set('.contact-section h2, .social-icon, .contact-form-fields div, .btn-primary', {
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

    // Animación de los iconos sociales
    gsap.from('.social-icon', {
      x: -30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.3
    });

    // Animación de los campos del formulario
    gsap.from('.contact-form-fields div', {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      delay: 0.5
    });

    // Animación del botón
    gsap.from('.btn-primary', {
      y: 30,
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)',
      delay: 0.8
    });
  }

  async onSubmit() {
    if (this.isSubmitting) return;

    // Resetear estados
    this.submitSuccess = false;
    this.submitError = false;
    this.submitMessage = '';
    this.isSubmitting = true;

    // Animación de inicio de envío
    gsap.to('.btn-primary', {
      scale: 0.95,
      duration: 0.1
    });

    try {
      // Simulación de envío (reemplazar con servicio real)
      await this.sendEmail();
      
      // Éxito
      this.submitSuccess = true;
      this.submitMessage = '¡Mensaje enviado correctamente! Te responderé pronto.';
      
      // Animación de éxito
      gsap.to('.btn-primary', {
        scale: 1,
        backgroundColor: '#00ff9d',
        duration: 0.3,
        ease: 'back.out(1.7)'
      });

      // Limpiar formulario después de 2 segundos
      setTimeout(() => {
        this.resetForm();
      }, 2000);

    } catch (error) {
      // Error
      this.submitError = true;
      this.submitMessage = 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.';
      
      // Animación de error
      gsap.to('.btn-primary', {
        scale: 1,
        duration: 0.6,
        ease: 'power2.out'
      });
      
      // Animación de shake
      gsap.to('.btn-primary', {
        x: -10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: 'power2.inOut'
      });
    } finally {
      this.isSubmitting = false;
      
      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        this.submitMessage = '';
        this.submitSuccess = false;
        this.submitError = false;
        
        // Restaurar botón
        gsap.to('.btn-primary', {
          scale: 1,
          backgroundColor: '',
          duration: 0.3
        });
      }, 5000);
    }
  }

  private async sendEmail(): Promise<void> {
    // Preparar los parámetros del template
    const templateParams = {
      from_name: this.contactForm.name,
      from_email: this.contactForm.email,
      message: this.contactForm.message,
      to_email: 'luarbaz@gmail.com', 
      reply_to: this.contactForm.email
    };

    try {
      // Enviar email usando EmailJS
      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams
      );
      
      console.log('Email enviado exitosamente:', response);
      return Promise.resolve();
    } catch (error) {
      console.error('Error al enviar email:', error);
      return Promise.reject(error);
    }
  }

  private resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      message: ''
    };
    
    // Animación de reset
    gsap.from('.contact-form-fields div', {
      opacity: 0.5,
      y: 10,
      stagger: 0.1,
      duration: 0.3
    });
  }
}
