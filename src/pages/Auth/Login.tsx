import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { loginUser } from "@/services/firebaseAuth";

import { zodResolver } from "@hookform/resolvers/zod";
import { IonContent, IonImg, IonPage } from "@ionic/react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const history = useHistory();

  const onSubmit = async (data: LoginData) => {
    try {
      const user = await loginUser(data.email, data.password);
      console.log("Sesión iniciada:", user);
      alert("Bienvenido " + user.email);
      history.push("/tabs"); // 👈 redirige a Home
    } catch (error: any) {
      console.error(error);
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        className="flex items-center justify-center bg-gray-100"
      >
        {/* Contenedor que asegura centrado vertical y horizontal */}
        <div className="flex flex-col justify-center items-center min-h-screen w-full">
          <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Inicia Sesión
            </h1>
            <IonImg
              src="./src/assets/images/Logo.png"
              alt="Logo YoDenuncio"
              className="mx-auto mb-12 w-36 h-36 object-contain"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Correo electrónico"
                type="email"
                {...register("email")}
                error={errors.email?.message}
              />
              <Input
                label="Contraseña"
                type="password"
                {...register("password")}
                error={errors.password?.message}
              />

              <Button type="submit" label="Ingresar" />

              <p className="text-sm text-center text-gray-500 mt-4">
                ¿No tienes cuenta?
                <a href="/register" className="text-blue-600 font-semibold">
                  Regístrate
                </a>
              </p>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
