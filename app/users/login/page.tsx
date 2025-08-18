"use client";
import axios from "axios";
import { useActionState } from "react";

async function loginAction(prevState: string | null, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("Logging in:", { email, password });

  try {
    const res = await axios.post("http://localhost:4000/user/login", {
      email,
      password,
    });
    console.log("Login response:", res);
    if (res.status !== 200) throw new Error("Erreur lors de la connexion");
    return "Connexion réussie ✅";
  } catch (err: any) {
    return err.response?.data?.message || err.message;
  }
}


export default function LoginPage() {

  const [state, formAction] = useActionState(loginAction, null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Se connecter</h1>

      <form action={formAction} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Connexion
        </button>
      </form>

      {state && <p className="mt-4 text-sm text-red-600">{state}</p>}
    </div>
  );
}
