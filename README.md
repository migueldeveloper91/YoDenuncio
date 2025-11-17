# 📱 Aplicación Móvil de Participación Ciudadana

`<img src="./src/assets/images/LogoYodenuncio.png" alt="Logo YoDenuncio" width="200">`{=html}

**YoDenuncio** es una aplicación móvil multiplataforma desarrollada con
**Ionic + React + Firebase**, cuyo propósito es facilitar la **denuncia
ciudadana de hechos delictivos, irregularidades o situaciones de
riesgo** desde cualquier dispositivo móvil.\
El objetivo principal es brindar a los usuarios una herramienta **ágil,
confiable y segura** para reportar incidentes que afecten la convivencia
o seguridad en su entorno.

---

## 🌍 Descripción General

**YoDenuncio** promueve la participación ciudadana y la colaboración con
las autoridades mediante una aplicación que permite registrar denuncias
**geolocalizadas con evidencia fotográfica**, ver su historial y recibir
actualizaciones sobre el estado de los reportes.

El sistema se basa en tecnologías modernas y escalables, con una
arquitectura optimizada para dispositivos móviles Android e iOS.

---

## 🧠 Tecnologías y Herramientas

---

Categoría Tecnologías utilizadas

---

**Framework Ionic Framework v7 + React 19
principal**

**Librerías UI** Tailwind CSS v4, Ionicons, shadcn/ui

**Estado global** Zustand

**Validación de React Hook Form + Zod
formularios**

**Backend / BaaS** Firebase Authentication, Firestore, Firebase Storage

**Acceso nativo** Capacitor v7 (Cámara, Geolocalización, Archivos)

**Routing** React Router DOM v5

**Compilación y Vite + TypeScript
desarrollo**

**Pruebas y Vitest, Cypress, ESLint
linting**

**Estilos** TailwindCSS + CSS variables personalizadas

**Control de Git + GitHub
versiones**

---

---

## ⚙️ Estructura del Proyecto

    yo-denuncio/
    │
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── stores/
    │   ├── theme/
    │   ├── utils/
    │   ├── hooks/
    │   └── App.tsx
    │
    ├── android/
    ├── ios/
    ├── capacitor.config.ts
    ├── tailwind.config.ts
    ├── vite.config.ts
    └── package.json

---

## 🚀 Características principales

- Autenticación segura con Firebase Authentication\
- Formulario de denuncia con validación\
- Captura o carga de imágenes con cámara nativa\
- Geolocalización automática\
- Historial de denuncias\
- Modo claro/oscuro\
- Sincronización en Firestore\
- Diseño responsivo para Android y iOS

---

## 🧩 Flujo de Navegación

    [Login / Registro]
           ↓
    [Inicio Principal]
       ├── Nueva Denuncia → [Formulario → Confirmación]
       ├── Historial → [Detalle de Denuncia]
       └── Acerca de / Configuración

---

## 🧭 Arquitectura

    UI (React)
    │
    ├── Hooks personalizados
    ├── Stores (Zustand)
    └── Services (Firebase)

---

# ⚒️ Instalación y Ejecución

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/usuario/yo-denuncio.git
cd yo-denuncio
```

## 2️⃣ Instalar dependencias

```bash
npm install
```

## 3️⃣ Configurar Firebase

Crear el archivo `src/firebaseConfig.ts`:

```ts
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET.appspot.com",
  messagingSenderId: "TU_MESSAGING_ID",
  appId: "TU_APP_ID",
};

export const app = initializeApp(firebaseConfig);
```

---

# 💻 Ejecutar en Web

```bash
ionic serve
```

---

# 🤖 Ejecutar en Android (Capacitor 7)

### 1. Sincronizar proyecto nativo

```bash
npx cap sync android
npm run android:sync
```

### 2. Abrir en Android Studio

```bash
npx cap open android
npm run android:run

```

### 3. Ejecutar con Live Reload

Iniciar servidor:

```bash
npm run dev
```

Ejecutar:

```bash
npx cap run android -l
```

> Nota: En Capacitor 7 ya no existe `--external`.

---

# 📦 Generar APK / AAB

Desde Android Studio:

    Build → Generate Signed Bundle / APK

---

## 👥 Autores

- Jaiber Arrieta Guevara\
- Miguel Augusto Rojas Hernández

Institución: Politécnico Grancolombiano\
Curso: Énfasis en Programación Móvil\
Año: 2025\
Versión: 1.1.0

---

## ⚖️ Licencia

Licencia MIT.

---

"YoDenuncio: tecnología ciudadana para una comunidad más segura." 🚨
