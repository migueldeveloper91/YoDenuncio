import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { motion } from "framer-motion";
import { chatbubbles, informationCircle, mail } from "ionicons/icons";

export default function HelpAndSupport() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": "var(--color-secondary)" }}>
          <IonButtons slot="start">
            <IonBackButton
              style={{ color: "white" }}
              defaultHref="/tabs/profile"
            />
          </IonButtons>
          <IonTitle style={{ color: "white" }}>Ayuda y Soporte</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="p-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* INTRO */}
          <section className="bg-white p-5 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">
              Necesitas ayuda?
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Aquí encontrarás respuestas rápidas y opciones para contactar al
              equipo de soporte.
            </p>
          </section>

          {/* FAQ */}
          <section className="bg-white p-5 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Preguntas frecuentes
            </h3>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700">
                  ¿Cómo creo una denuncia?
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Desde la pestaña <strong>Nueva denuncia</strong>, completa la
                  información requerida y envíala. Debes incluir al menos un
                  título y una categoría.
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-700">
                  ¿Puedo editar una denuncia después de enviarla?
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  No, por seguridad la denuncia no puede ser modificada. Sin
                  embargo, sí puedes agregar comentarios si tu caso lo requiere.
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-700">
                  ¿Mis datos personales están protegidos?
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Sí. Solo tú puedes ver tu información personal gracias al
                  sistema de autenticación con Firebase.
                </p>
              </div>
            </div>
          </section>

          {/* CONTACT OPTIONS */}
          <section className="bg-white p-5 rounded-2xl shadow-md space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              ¿Aún necesitas ayuda?
            </h3>

            {/* Email */}
            <button
              className="w-full flex items-center justify-between bg-gray-100 p-4 rounded-xl hover:bg-gray-200 transition"
              onClick={() => window.open("mailto:soporte@yodenuncio.com")}
            >
              <div className="flex items-center gap-3">
                <IonIcon icon={mail} className="text-orange-600 text-xl" />
                <span className="font-medium text-gray-800">
                  Enviar correo al soporte
                </span>
              </div>
            </button>

            {/* Chat */}
            <button
              className="w-full flex items-center justify-between bg-gray-100 p-4 rounded-xl hover:bg-gray-200 transition"
              onClick={() =>
                window.open("https://wa.me/573124040839", "_blank")
              }
            >
              <div className="flex items-center gap-3">
                <IonIcon
                  icon={chatbubbles}
                  className="text-green-600 text-xl"
                />
                <span className="font-medium text-gray-800">
                  Chat de soporte (WhatsApp)
                </span>
              </div>
            </button>
          </section>

          {/* ABOUT */}
          <section className="bg-white p-5 rounded-2xl shadow-md">
            <div className="flex items-start gap-4">
              <IonIcon
                icon={informationCircle}
                className="text-blue-600 text-2xl mt-1"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Información del proyecto
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  YoDenuncio es una aplicación creada para facilitar el reporte
                  ciudadano de manera rápida, accesible y segura.
                </p>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <div className="text-center text-gray-400 text-sm mb-6">
            © {new Date().getFullYear()} YoDenuncio — Todos los derechos
            reservados.
          </div>
        </motion.div>
      </IonContent>
    </IonPage>
  );
}
