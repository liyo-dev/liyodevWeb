// Configuración de EmailJS
// IMPORTANTE: Reemplaza estos valores con los tuyos de EmailJS

export const emailConfig = {
  serviceId: 'service_vn37rmd',     // El ID de tu servicio de email (Gmail, Outlook, etc.)
  templateId: 'template_d635da4',   // El ID del template que crees en EmailJS
  publicKey: 'nD2O-48HgJbW_T_kR'      // Tu clave pública de EmailJS
};

// PASOS PARA CONFIGURAR:
// 1. Ve a https://www.emailjs.com/
// 2. Crea una cuenta gratuita
// 3. Configura un servicio de email (Gmail recomendado)
// 4. Crea un template de email
// 5. Obtén tu Public Key desde el dashboard
// 6. Reemplaza los valores arriba con los tuyos

// EJEMPLO DE TEMPLATE EN EMAILJS:
// Subject: Nuevo mensaje desde tu portfolio de {{from_name}}
// 
// Has recibido un nuevo mensaje desde tu portfolio:
// 
// Nombre: {{from_name}}
// Email: {{from_email}}
// 
// Mensaje:
// {{message}}
// 
// ---
// Este mensaje fue enviado desde tu formulario de contacto.
