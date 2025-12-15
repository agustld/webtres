# Página de Boda - Landing Page (Clon de Agendá la Fecha - Black)

Una hermosa página de invitación para boda creada con Next.js, TypeScript y Tailwind CSS, inspirada en el diseño de [Agendá la Fecha](https://www.agendalafecha.com/invitaciones/black/).

## 🚀 Inicio Rápido

### Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📝 Personalización

### Cambiar la Fecha de la Boda

Edita el archivo `app/page.tsx` y modifica la línea:
```typescript
const weddingDate = new Date('2024-12-31T18:00:00').getTime()
```

### Cambiar los Nombres

Edita el archivo `app/page.tsx` y busca:
```typescript
María & Juan
```

### Cambiar los Detalles del Evento

Modifica las secciones de "Ceremonia" y "Fiesta" en `app/page.tsx`.

### Agregar Audio de Bienvenida

Coloca un archivo de audio llamado `welcome.mp3` en la carpeta `public/audio/` para que el reproductor funcione. Si no existe, se mostrará un mensaje de fallback.

## 🛠️ Tecnologías

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Google Fonts** - Playfair Display y Dancing Script

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 🎨 Características

- ✨ Diseño elegante con tema negro (Black Theme)
- 📱 Totalmente responsive
- ⏰ Contador regresivo en tiempo real (días, hs, min, seg)
- 🎵 Reproductor de audio para mensaje de bienvenida
- 📋 Formulario de confirmación de asistencia (RSVP)
- 🎁 Sección de regalos con datos bancarios
- 📅 Integración con calendarios (Google, Outlook, Apple, Yahoo)
- 🎵 Sugerencias de canciones
- 🏨 Información útil (hoteles y traslados)
- 📸 Integración con Instagram
- 🎩 Dress code
- 🗺️ Enlaces a mapas para ceremonia y fiesta

## 📄 Licencia

Este proyecto es de uso personal.

