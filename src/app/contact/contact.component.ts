import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { emailConfig } from './email.config';
import { LanguageService } from '../services/language.service';
import { REDES } from '../data/proyectos';

type EstadoEnvio = 'listo' | 'enviando' | 'enviado' | 'error' | 'invalido';

/** Sección de contacto: redes y formulario que envía el mensaje por EmailJS. */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  readonly redes = REDES;
  formulario = { name: '', email: '', message: '' };
  estado: EstadoEnvio = 'listo';

  constructor(public i18n: LanguageService) {
    emailjs.init(emailConfig.publicKey);
  }

  async enviar(): Promise<void> {
    if (this.estado === 'enviando') return;
    if (!this.esValido()) {
      this.estado = 'invalido';
      return;
    }
    this.estado = 'enviando';
    try {
      await emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
        from_name: this.formulario.name.trim(),
        from_email: this.formulario.email.trim(),
        message: this.formulario.message.trim(),
        to_email: 'luarbaz@gmail.com',
        reply_to: this.formulario.email.trim(),
      });
      this.estado = 'enviado';
      this.formulario = { name: '', email: '', message: '' };
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      this.estado = 'error';
    }
  }

  private esValido(): boolean {
    const f = this.formulario;
    return f.name.trim().length >= 2
      && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())
      && f.message.trim().length >= 10;
  }
}
