import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_4gh47kw"; 
const PUBLIC_KEY = "SX7tpj0-g775atQXH";
const TEMPLATE_WELCOME_EMAIL = "template_3nz7a2e";
const TEMPLATE_NEW_DENUNCIA = "template_6gj59b9";

// ---------------------------------------------------------
// 1. Función GENÉRICA (reutilizable para cualquier template)
// ---------------------------------------------------------
export const sendEmail = (
  templateId: string,
  variables: Record<string, any>
) => {
  console.log("📧 Enviando email con variables:", variables);
  return emailjs.send(SERVICE_ID, templateId, variables, PUBLIC_KEY);
};

// ---------------------------------------------------------
// 2. Funciones ESPECÍFICAS (opcional pero recomendado)
// ---------------------------------------------------------

// Correo de bienvenida
export const sendWelcomeEmail = (email: string, name: string) => {
  console.log("🔍 Preparando correo de bienvenida para:", email, name);
  
  // Validar que el email no esté vacío
  if (!email || email.trim() === "") {
    throw new Error("El email no puede estar vacío");
  }
  
  const templateParams = {
    email: email,              // 👈 Tu template usa {{email}}
    name: name || "Usuario",   // 👈 Tu template usa {{name}}
    user_name: name || "Usuario",
    user_email: email,
    from_name: "YoDenuncio",
  };
  
  console.log("📨 Parámetros del template:", templateParams);
  
  return sendEmail(TEMPLATE_WELCOME_EMAIL, templateParams);
};

// Correo cuando el usuario crea una denuncia
export const sendDenunciaEmail = (
  email: string,
  userName: string,
  titulo: string,
  descripcion: string
) => {
  console.log("🔍 Preparando correo de denuncia para:", email, userName);
  
  const templateParams = {
    email: email,                      // Para el campo "To Email" {{email}}
    user_name: userName || "Usuario",  // 👈 {{user_name}} en el contenido
    denuncia_titulo: titulo,           // 👈 {{denuncia_titulo}}
    denuncia_descripcion: descripcion, // 👈 {{denuncia_descripcion}}
    from_name: "YoDenuncio",
  };
  
  console.log("📨 Parámetros del template de denuncia:", templateParams);
  
  return sendEmail(TEMPLATE_NEW_DENUNCIA, templateParams);
};

// Aquí mismo puedes agregar más plantillas en el futuro:
// export const sendPasswordResetEmail = (...)
