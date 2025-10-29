# 📱 YoDenuncio – Aplicación Móvil de Participación Ciudadana

**YoDenuncio** es una aplicación móvil multiplataforma desarrollada con **Ionic + React** y **Firebase**, cuyo propósito es facilitar la **denuncia ciudadana de hechos delictivos, irregularidades o situaciones de riesgo** desde cualquier dispositivo móvil.  
El objetivo principal es brindar a los usuarios una herramienta ágil, confiable y segura para reportar incidentes que afecten la convivencia o seguridad en su entorno.

---

## 🧩 1. Justificación

La inseguridad y la falta de canales efectivos de denuncia son problemáticas comunes en muchas comunidades.  
**YoDenuncio** busca empoderar a los ciudadanos mediante una plataforma digital que permita reportar, de forma sencilla, eventos como robos, vandalismo, violencia o emergencias, con la posibilidad de adjuntar fotos, ubicación y descripción del suceso.

### 🔹 Pertinencia del proyecto
El desarrollo como **aplicación multiplataforma híbrida** (con **Ionic + React**) permite alcanzar una mayor cobertura, ejecutándose tanto en **Android como en iOS** desde una sola base de código, optimizando tiempo y recursos de desarrollo.

### 🔹 Razones para el enfoque multiplataforma
- **Eficiencia de costos y tiempo:** Una sola base de código para ambas plataformas.  
- **Consistencia visual:** Componentes adaptables al diseño nativo (Material Design y Cupertino).  
- **Mantenimiento simplificado:** Actualizaciones centralizadas.  
- **Mayor alcance:** Disponible para diferentes dispositivos y sistemas operativos.

---

## 🎯 2. Objetivos

### Objetivo general
Desarrollar una **aplicación móvil multiplataforma híbrida** que permita a los ciudadanos **registrar y enviar denuncias geolocalizadas** con evidencia fotográfica, mejorando los canales de comunicación con las autoridades competentes.

### Objetivos específicos
1. Implementar el registro e inicio de sesión mediante Firebase Authentication.  
2. Diseñar un formulario de denuncia que permita incluir descripción, categoría, ubicación y evidencia fotográfica.  
3. Integrar la API nativa de cámara y geolocalización mediante Capacitor.  
4. Permitir al usuario consultar el historial de denuncias realizadas.  
5. Desarrollar una interfaz accesible y adaptativa para Android e iOS.  
6. Incorporar una sección “Acerca de” con información institucional y de los desarrolladores.

---

## ⚙️ 3. Requerimientos del sistema

### 🔹 Requerimientos funcionales (RF)

| ID | Requerimiento funcional | Descripción |
|----|--------------------------|--------------|
| RF-001 | Registro de usuarios | El sistema debe permitir crear una cuenta mediante correo electrónico y contraseña. |
| RF-002 | Inicio de sesión | El usuario podrá autenticarse con sus credenciales de Firebase. |
| RF-003 | Crear denuncia | El usuario podrá registrar una denuncia con descripción, foto y ubicación. |
| RF-004 | Adjuntar imagen | La app debe permitir capturar o seleccionar una imagen desde la galería. |
| RF-005 | Geolocalización | La aplicación debe obtener la ubicación GPS al momento de crear una denuncia. |
| RF-006 | Historial de denuncias | El usuario podrá visualizar las denuncias creadas previamente. |
| RF-007 | Visualizar detalle | Al seleccionar una denuncia, se mostrará su información completa. |
| RF-008 | Notificaciones | El usuario recibirá notificaciones cuando su denuncia cambie de estado. |
| RF-009 | Sección “Acerca de” | La app incluirá una pantalla con información del proyecto y autores. |
| RF-010 | Cierre de sesión | El sistema debe permitir al usuario cerrar su sesión de manera segura. |

---

### 🔹 Requerimientos no funcionales (RNF)

| ID | Requerimiento no funcional | Descripción |
|----|-----------------------------|-------------|
| RNF-001 | Framework de desarrollo | La aplicación debe desarrollarse usando **Ionic v7+** con **React**. |
| RNF-002 | Acceso nativo | Debe usar **Capacitor v5+** para cámara, GPS y almacenamiento local. |
| RNF-003 | Rendimiento | La interfaz debe mantener fluidez incluso con múltiples denuncias almacenadas. |
| RNF-004 | Compatibilidad | Compatible con Android 8+ y iOS 13+. |
| RNF-005 | Seguridad | El acceso y almacenamiento de datos debe realizarse mediante Firebase Authentication y Firestore Security Rules. |
| RNF-006 | Usabilidad | La interfaz debe ser limpia, intuitiva y responsiva. |
| RNF-007 | Operatividad offline | La aplicación debe permitir crear denuncias incluso sin conexión, sincronizando datos al reconectarse. |
| RNF-008 | Escalabilidad | La arquitectura debe permitir agregar módulos futuros (chat, mapa de calor, estadísticas). |
| RNF-009 | Accesibilidad | Debe cumplir con buenas prácticas de accesibilidad (contraste, tamaño de fuente, navegación). |

---

## 🧭 4. Flujo de navegación

El flujo principal de la aplicación sigue una estructura de navegación simple e intuitiva:

```
[Inicio de Sesión]
       ↓
[Inicio Principal]
   ├── Nueva Denuncia → [Formulario] → [Confirmación]
   ├── Historial → [Detalle de Denuncia]
   └── Acerca de
```

---

## 🧠 5. Tecnologías utilizadas

| Tecnología | Uso |
|-------------|-----|
| **Ionic Framework** | Desarrollo multiplataforma híbrido. |
| **React** | Interfaz basada en componentes. |
| **Firebase Authentication** | Registro e inicio de sesión. |
| **Cloud Firestore** | Base de datos en tiempo real. |
| **Firebase Storage** | Almacenamiento de imágenes. |
| **Capacitor** | Acceso nativo a cámara, GPS y almacenamiento. |
| **TypeScript** | Tipado estático y seguridad en el código. |
| **HTML/CSS** | Maquetación y estilos visuales. |

---

## 📁 6. Estructura del proyecto

```
yo-denuncio/
│
├── src/
│   ├── components/         # Componentes reutilizables (botones, inputs, modales)
│   ├── pages/              # Pantallas principales (Login, Home, Denuncia, Acerca de)
│   ├── services/           # Firebase, geolocalización y lógica de negocio
│   ├── theme/              # Estilos globales y variables de color
│   ├── utils/              # Validaciones y helpers
│   └── App.tsx             # Configuración de rutas principales
│
├── capacitor.config.ts     # Configuración de Capacitor
├── firebaseConfig.ts       # Inicialización de Firebase
└── package.json            # Dependencias del proyecto
```

---

## ⚙️ 7. Instalación y configuración

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

```typescript
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET.appspot.com",
  messagingSenderId: "TU_MESSAGING_ID",
  appId: "TU_APP_ID"
};

export const app = initializeApp(firebaseConfig);
```

### 4️⃣ Ejecutar el proyecto
```bash
ionic serve
```

### 5️⃣ Compilar para Android/iOS
```bash
ionic capacitor build android
ionic capacitor build ios
```

---

## 🧾 8. Licencia

Este proyecto se desarrolla con fines **académicos y educativos** bajo licencia **MIT**, permitiendo su libre uso y modificación con reconocimiento a los autores.

---

## 👨‍💻 9. Autores

**Proyecto desarrollado por:**

- 🧑‍💻 **Jaiber Arrieta Guevara**  
- 🧑‍💻 **Miguel Augusto Rojas Hernández**

**Universidad:** Institución Universitaria Politécnico Grancolombiano 
**Curso:** Énfasis en programación móvil  
**Año:** 2025  
**Versión:** 1.0.0

---

## 💡 10. Futuras mejoras

- Implementar **denuncias anónimas**.  
- Integrar **chat directo** con entidades de seguridad.  
- Añadir **estadísticas** y **mapas de calor**.  
- Soporte **multilenguaje**.  
- Implementar **modo oscuro / claro**.  

---

> “YoDenuncio: tecnología ciudadana para una comunidad más segura.”
