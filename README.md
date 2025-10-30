# 📱 YoDenuncio – Aplicación Móvil de Participación Ciudadana

**YoDenuncio** es una aplicación móvil multiplataforma desarrollada con **Ionic + React + Firebase**, cuyo propósito es facilitar la **denuncia ciudadana de hechos delictivos, irregularidades o situaciones de riesgo** desde cualquier dispositivo móvil.  
El objetivo principal es brindar a los usuarios una herramienta **ágil, confiable y segura** para reportar incidentes que afecten la convivencia o seguridad en su entorno.

---

## 🌍 Descripción General

**YoDenuncio** promueve la participación ciudadana y la colaboración con las autoridades mediante una aplicación que permite registrar denuncias **geolocalizadas con evidencia fotográfica**, ver su historial y recibir actualizaciones sobre el estado de los reportes.

El sistema se basa en tecnologías modernas y escalables, con una arquitectura optimizada para dispositivos móviles Android e iOS.

---

## 🧠 Tecnologías y Herramientas

| Categoría                     | Tecnologías utilizadas                                                             |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| **Framework principal**       | [Ionic Framework v7](https://ionicframework.com/) + [React 19](https://react.dev/) |
| **Librerías UI**              | Tailwind CSS v4, Ionicons, shadcn/ui (selectiva)                                   |
| **Estado global**             | Zustand                                                                            |
| **Validación de formularios** | React Hook Form + Zod                                                              |
| **Backend / BaaS**            | Firebase Authentication, Firestore, Firebase Storage                               |
| **Acceso nativo**             | Capacitor v5 (Cámara, Geolocalización, Archivos)                                   |
| **Routing**                   | React Router DOM v5                                                                |
| **Compilación y desarrollo**  | Vite + TypeScript                                                                  |
| **Pruebas y linting**         | Vitest, Cypress, ESLint                                                            |
| **Estilos**                   | TailwindCSS + CSS variables personalizadas                                         |
| **Control de versiones**      | Git + GitHub                                                                       |

---

## ⚙️ Estructura del Proyecto

```
yo-denuncio/
│
├── src/
│   ├── components/         # Componentes reutilizables (botones, inputs, modales)
│   │   ├── layout/         # Cabeceras, navegación, estructura visual
│   │   └── ui/             # Componentes atómicos (Button, Input, Modal)
│   ├── pages/              # Pantallas principales (Login, Home, Denuncia, Acerca de)
│   ├── services/           # Firebase, geolocalización y lógica de negocio
│   ├── stores/             # Estados globales con Zustand
│   ├── theme/              # Estilos globales y variables
│   ├── utils/              # Validaciones y helpers
│   ├── hooks/              # Hooks personalizados
│   └── App.tsx             # Configuración de rutas principales
│
├── android/                # Proyecto Android (generado con Capacitor)
├── ios/                    # Proyecto iOS (generado con Capacitor)
├── capacitor.config.ts     # Configuración de Capacitor
├── tailwind.config.ts      # Configuración de Tailwind
├── vite.config.ts          # Configuración de Vite + alias
└── package.json            # Dependencias del proyecto
```

---

## 🚀 Características principales

✅ **Autenticación segura** con Firebase Authentication (correo y contraseña).  
✅ **Formulario de denuncia** con validación en tiempo real.  
✅ **Captura o selección de imágenes** mediante API nativa de cámara.  
✅ **Geolocalización automática** con Capacitor Geolocation.  
✅ **Historial de denuncias** consultable por usuario.  
✅ **Modo claro/oscuro** con sistema de temas dinámico.  
✅ **Diseño responsivo** compatible con Android e iOS.  
✅ **Sincronización en la nube** mediante Firestore.  
✅ **Soporte offline (futuro)** para registrar denuncias sin conexión.

---

## 🧩 Flujo de Navegación

```
[Login / Registro]
       ↓
[Inicio Principal]
   ├── Nueva Denuncia → [Formulario → Confirmación]
   ├── Historial → [Detalle de Denuncia]
   └── Acerca de / Configuración
```

---

## 🧭 Arquitectura

El proyecto sigue una **arquitectura modular basada en componentes**, con un enfoque **MVVM simplificado**:

```
UI (React + Ionic)
│
├── Hooks personalizados → Manejo de lógica y estado
├── Stores (Zustand) → Estados globales y sincronización
└── Services (Firebase) → Lógica de datos y acceso nativo
```

Esta estructura permite **escalabilidad**, **legibilidad** y **fácil mantenimiento**.

---

## ⚒️ Instalación y Ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/usuario/yo-denuncio.git
cd yo-denuncio
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar Firebase

Crea el archivo `firebaseConfig.ts` en `/src` con tus credenciales:

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

### 4️⃣ Ejecutar el proyecto en web

```bash
ionic serve
```

### 5️⃣ Ejecutar en Android o iOS

```bash
npx cap sync
ionic capacitor run android
ionic capacitor run ios
```

Para dispositivos físicos, asegúrate de tener conectado el dispositivo y habilitada la depuración USB.

---

## 💡 Futuras Mejoras

- Denuncias anónimas.
- Chat directo con autoridades.
- Mapas de calor e informes estadísticos.
- Integración con notificaciones push.
- Sincronización offline.
- Soporte multilenguaje.

---

## 👥 Autores

**Proyecto desarrollado por:**

- 🧑‍💻 **Jaiber Arrieta Guevara**
- 🧑‍💻 **Miguel Augusto Rojas Hernández**

**Institución:** Politécnico Grancolombiano  
**Curso:** Énfasis en Programación Móvil  
**Año:** 2025  
**Versión:** 1.1.0

---

## ⚖️ Licencia

Este proyecto está bajo la licencia **MIT**, permitiendo su libre uso, modificación y distribución con atribución a los autores originales.

---

> “YoDenuncio: tecnología ciudadana para una comunidad más segura.” 🚨
