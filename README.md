# 🎮 Liyodev - Portfolio Web

<div align="center">

![Angular](https://img.shields.io/badge/Angular-19.1-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)

**Portfolio personal de Raúl Báez (Liyodev)**  
*Fullstack Developer & Game Creator*

[🌐 Ver Portfolio](https://liyodev.web.app/) • [📧 Contacto](https://liyodev.web.app/#/contacto)

</div>

---

## ✨ Características

- 🎨 **Diseño Moderno** con animaciones fluidas usando GSAP
- 📱 **Fully Responsive** - optimizado para móviles, tablets y desktop
- 🎮 **Portfolio de Juegos** - showcase de proyectos publicados en Steam y Google Play
- 💼 **Proyectos Web** - aplicaciones fullstack con Angular y otras tecnologías
- 📬 **Formulario de Contacto** funcional con EmailJS
- 🔒 **Política de Privacidad** integrada y conforme con Google Play Store
- ⚡ **SEO Optimizado** con meta tags, Open Graph y Twitter Cards
- 🌙 **UI Dark Mode** con gradientes cyan y efectos glassmorphism

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Angular 19.1
- **Lenguaje**: TypeScript 5.7
- **Animaciones**: GSAP 3.13
- **Estilos**: CSS3 moderno con variables y grid/flexbox
- **Routing**: Angular Router con lazy loading

### Servicios
- **Email**: EmailJS para formulario de contacto
- **SEO**: Meta tags dinámicos con Angular SEO Service
- **Hosting**: Firebase Hosting
- **Analytics**: Integración preparada para Google Analytics

### Herramientas de Desarrollo
- Angular CLI 19.1.8
- Karma + Jasmine para testing
- TypeScript Compiler

## 🚀 Instalación y Desarrollo

### Requisitos Previos
- Node.js 18.x o superior
- npm 9.x o superior
- Angular CLI 19.x

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/liyo-dev/liyoDevWeb.git

# Entrar al directorio
cd liyoDevWeb

# Instalar dependencias
npm install
```

### Servidor de Desarrollo

```bash
npm start
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente con cualquier cambio en los archivos fuente.

### Build de Producción

```bash
npm run build
```

Los archivos compilados se generarán en el directorio `dist/` optimizados para producción.

### Build con Watch Mode

```bash
npm run watch
```

## 📁 Estructura del Proyecto

```
liyoDevWeb/
├── src/
│   ├── app/
│   │   ├── about/          # Componente "Sobre mí"
│   │   ├── contact/        # Formulario de contacto
│   │   ├── footer/         # Footer de la aplicación
│   │   ├── games/          # Sección de videojuegos
│   │   ├── home/           # Página principal
│   │   ├── main/           # Layout principal
│   │   ├── menu/           # Menú de navegación
│   │   ├── portfolio/      # Portfolio de proyectos
│   │   ├── privacy-policy/ # Política de privacidad
│   │   └── services/       # Servicios compartidos (SEO)
│   ├── assets/
│   │   ├── icons/          # Iconos SVG
│   │   └── img/            # Imágenes del portfolio
│   └── index.html
├── public/                 # Archivos estáticos
│   ├── manifest.json       # PWA manifest
│   ├── robots.txt
│   └── sitemap.xml
└── firebase.json           # Configuración de Firebase
```

## 🎨 Características Destacadas

### Sistema de Navegación
- Menú lateral fijo en desktop
- Menú hamburguesa responsive en móvil
- Navegación suave entre secciones
- Scroll indicator personalizado

### Portfolio Interactivo
- Cards con efecto glassmorphism
- Swipe gestures en móvil
- Enlaces directos a Steam, Google Play e itch.io
- Showcase de capturas de juegos

### Formulario de Contacto
- Validación en tiempo real
- Integración con EmailJS
- Estados de envío (loading, success, error)
- Campos: nombre, email y mensaje

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm test

# Ejecutar tests con coverage
ng test --code-coverage
```

## 🌐 Deploy

El proyecto está configurado para deploy automático en Firebase Hosting:

```bash
# Build y deploy
ng build --configuration production
firebase deploy
```

## 📝 Configuración de EmailJS

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura tu servicio de email
3. Crea una plantilla de email
4. Actualiza las credenciales en `src/app/contact/email.config.ts`

Ver [EMAILJS_SETUP.md](src/app/contact/EMAILJS_SETUP.md) para más detalles.

## 📄 Licencia

© 2025 Raúl Báez (Liyodev). Todos los derechos reservados.

---

<div align="center">

**[Portfolio](https://liyodev.web.app/)** • **[LinkedIn](https://www.linkedin.com/in/liyodev)** • **[GitHub](https://github.com/liyo-dev)** • **[itch.io](https://liyodev.itch.io/)**

Hecho con ❤️ y Angular

</div>
