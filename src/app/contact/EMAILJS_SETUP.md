# 📧 Configuración del Formulario de Contacto con EmailJS

## ¿Qué es EmailJS?
EmailJS te permite enviar emails directamente desde el frontend sin necesidad de un servidor backend. Es gratuito hasta 200 emails por mes.

## 🚀 Pasos para configurar EmailJS:

### 1. Crear cuenta en EmailJS
- Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
- Crea una cuenta gratuita
- Confirma tu email

### 2. Configurar un servicio de email
- En el dashboard, ve a **Email Services**
- Haz clic en **Add New Service**
- Selecciona **Gmail** (recomendado) u otro proveedor
- Sigue las instrucciones para conectar tu cuenta de Gmail
- **Guarda el Service ID** que aparece

### 3. Crear un template de email
- Ve a **Email Templates**
- Haz clic en **Create New Template**
- Usa este template como ejemplo:

```
Subject: Nuevo mensaje desde tu portfolio de {{from_name}}

Has recibido un nuevo mensaje desde tu portfolio:

Nombre: {{from_name}}
Email: {{from_email}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu formulario de contacto.
```

- **Guarda el Template ID** que aparece

### 4. Obtener tu Public Key
- Ve a **Account** en el menú
- Copia tu **Public Key**

### 5. Configurar en tu proyecto
- Abre el archivo `src/app/contact/email.config.ts`
- Reemplaza los valores:

```typescript
export const emailConfig = {
  serviceId: 'service_abc123',      // Tu Service ID
  templateId: 'template_xyz789',    // Tu Template ID  
  publicKey: 'user_def456'          // Tu Public Key
};
```

### 6. Configurar email de destino
- En el archivo `contact.component.ts`, línea ~175
- Cambia `'tu-email@ejemplo.com'` por tu email real:

```typescript
to_email: 'tu-email-real@gmail.com'
```

## ✅ ¡Listo!
Una vez configurado, el formulario enviará emails reales a tu dirección cuando los usuarios completen el formulario de contacto.

## 🔒 Seguridad
- La Public Key es segura para usar en el frontend
- EmailJS valida el dominio desde donde se envían los emails
- Puedes configurar límites de rate limiting en el dashboard

## 📊 Monitoreo
- Ve a tu dashboard de EmailJS para ver estadísticas de emails enviados
- Recibirás los emails en tu bandeja de entrada configurada

## 🆓 Límites gratuitos
- 200 emails/mes gratis
- Si necesitas más, hay planes pagos desde $12/mes
