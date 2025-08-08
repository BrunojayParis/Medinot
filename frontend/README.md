# Medinot Frontend

Plataforma web moderna para la gestión de turnos médicos y historias clínicas, construida con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características

### ✨ Funcionalidades Principales

- **Sistema de Autenticación**: Registro e inicio de sesión para pacientes y doctores
- **Gestión de Turnos**: Agendar, modificar y cancelar citas médicas
- **Historias Clínicas**: Acceso seguro a información médica
- **Dashboard Personalizado**: Interfaz adaptada según el rol del usuario
- **Dark Mode**: Tema oscuro/claro con persistencia
- **Diseño Responsive**: Optimizado para todos los dispositivos

### 🎨 Diseño y UX

- **Paleta Médica**: Colores inspirados en aplicaciones de salud profesionales
- **Componentes Reutilizables**: Biblioteca de UI components
- **Animaciones Suaves**: Transiciones y micro-interacciones
- **Accesibilidad**: Cumple con estándares WCAG

### 🔧 Tecnologías

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **React Hook Form** para formularios
- **Zod** para validación
- **Lucide React** para iconos
- **Framer Motion** para animaciones

## 📦 Instalación

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd frontend
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env.local
```

4. **Ejecutar en desarrollo**

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

5. **Abrir en el navegador**

```
http://localhost:3000
```

## 🏗️ Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── (auth)/            # Rutas de autenticación
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/         # Dashboard principal
│   │   ├── appointments/      # Gestión de turnos
│   │   ├── medical-records/   # Historias clínicas
│   │   ├── globals.css        # Estilos globales
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página de inicio
│   ├── components/            # Componentes reutilizables
│   │   ├── ui/               # Componentes base (Button, Input, etc.)
│   │   ├── forms/            # Formularios específicos
│   │   ├── layout/           # Componentes de layout
│   │   └── theme/            # Componentes de tema
│   ├── context/              # Contextos de React
│   │   └── ThemeContext.tsx  # Contexto para dark mode
│   ├── hooks/                # Custom hooks
│   ├── types/                # Definiciones de TypeScript
│   └── utils/                # Utilidades y helpers
├── public/                   # Archivos estáticos
├── tailwind.config.js        # Configuración de Tailwind
├── next.config.js           # Configuración de Next.js
└── tsconfig.json            # Configuración de TypeScript
```

## 🎯 Componentes Principales

### UI Components

- **Button**: Botones con múltiples variantes y estados
- **Input**: Campos de entrada con validación
- **Card**: Contenedores con diferentes opciones de padding
- **ThemeToggle**: Toggle para cambiar entre temas

### Páginas

- **Home**: Landing page con características y beneficios
- **Login**: Formulario de inicio de sesión
- **Register**: Registro con selección de rol
- **Dashboard**: Panel principal (en desarrollo)

## 🎨 Paleta de Colores

### Colores Principales

- **Primary**: Azul médico (#2563eb)
- **Secondary**: Verde salud (#10b981)
- **Accent**: Naranja cálido (#f59e0b)

### Dark Mode

- **Background**: Azul oscuro (#0f172a)
- **Surface**: Gris oscuro (#1e293b)
- **Border**: Gris medio (#334155)

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar en producción
npm run start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 📱 Responsive Design

La aplicación está optimizada para:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔒 Seguridad

- Validación de formularios con Zod
- Sanitización de inputs
- Protección contra XSS
- HTTPS obligatorio en producción

## 🚀 Próximas Características

- [ ] Dashboard completo para pacientes y doctores
- [ ] Sistema de notificaciones
- [ ] Calendario interactivo
- [ ] Chat en tiempo real
- [ ] Integración con APIs médicas
- [ ] PWA (Progressive Web App)
- [ ] Tests unitarios y de integración

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:

- Email: soporte@medinot.com
- Documentación: [docs.medinot.com](https://docs.medinot.com)

---

Desarrollado con ❤️ para la comunidad médica
