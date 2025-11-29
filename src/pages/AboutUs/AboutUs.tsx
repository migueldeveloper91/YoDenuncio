import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { motion } from "framer-motion";

export default function About() {
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
          <IonTitle style={{ color: "white" }}>Acerca de Nosotros</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="p-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <section className="bg-white p-5 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-2">¿Quiénes somos?</h2>
            <p className="text-gray-700 leading-relaxed">
              YoDenuncio es una aplicación móvil diseñada para fortalecer la
              participación ciudadana y mejorar la seguridad comunitaria
              mediante un sistema accesible, rápido y confiable para reportar
              incidentes. Nuestro objetivo es proporcionar una herramienta
              tecnológica que facilite la recolección de denuncias con evidencia
              fotográfica, ubicación y descripción detallada.
            </p>
          </section>

          <section className="bg-white p-5 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-2">Nuestra misión</h2>
            <p className="text-gray-700 leading-relaxed">
              Brindar una solución digital confiable y fácil de usar para
              registrar denuncias ciudadanas de manera inmediata, contribuyendo
              a la prevención, seguimiento y gestión de incidentes que afectan a
              la comunidad.
            </p>
          </section>

          <section className="bg-white p-5 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-2">Nuestra visión</h2>
            <p className="text-gray-700 leading-relaxed">
              Convertirnos en la plataforma de denuncia ciudadana más utilizada
              y reconocida del país, destacando por su funcionalidad,
              accesibilidad y su impacto positivo en la seguridad pública.
            </p>
          </section>

          <section className="bg-white p-5 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-2">Objetivos del Proyecto</h2>

            <h3 className="font-semibold mt-3">Objetivo General</h3>
            <p className="text-gray-700 leading-relaxed">
              Desarrollar una aplicación móvil que permita registrar y gestionar
              denuncias ciudadanas con información detallada, evidencias y
              georreferenciación.
            </p>

            <h3 className="font-semibold mt-3">Objetivos Específicos</h3>
            <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
              <li>
                Facilitar el registro de denuncias con fotografías, descripción
                y ubicación GPS.
              </li>
              <li>Garantizar una interfaz intuitiva y accesible.</li>
              <li>Permitir el seguimiento de denuncias de la comunidad.</li>
              <li>
                Integrar tecnologías modernas para asegurar rendimiento y
                escalabilidad.
              </li>
              <li>Fomentar la transparencia y participación ciudadana.</li>
            </ul>
          </section>

          <section className="bg-white p-5 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-2">¿Qué hacemos?</h2>
            <p className="text-gray-700 leading-relaxed">
              YoDenuncio permite a los usuarios crear denuncias con evidencia
              fotográfica, ubicación en tiempo real, descripciones detalladas y
              almacenamiento seguro en Firebase. Además, ofrece la posibilidad
              de visualizar y consultar denuncias públicas, así como acceder al
              detalle completo de cada caso.
            </p>
          </section>

          <section className="bg-white p-5 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-2">
              Tecnologías que utilizamos
            </h2>
            <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
              <li>React 19 + Ionic React 8</li>
              <li>Capacitor 6</li>
              <li>Firebase (Auth + Firestore)</li>
              <li>Cloudinary para imágenes</li>
              <li>Zustand para estado global</li>
              <li>React Hook Form + Zod</li>
              <li>React Router 5.3</li>
              <li>Vite 5</li>
              <li>Capacitor Google Maps</li>
            </ul>
          </section>

          <section className="bg-white p-5 rounded-2xl shadow-md mb-6">
            <h2 className="text-xl font-bold mb-2">Nuestro compromiso</h2>
            <p className="text-gray-700 leading-relaxed">
              Nos comprometemos a ofrecer una plataforma confiable que promueva
              la colaboración entre ciudadanos, comunidades e instituciones,
              aportando valor a la seguridad, transparencia y bienestar social.
            </p>
          </section>
        </motion.div>
      </IonContent>
    </IonPage>
  );
}
