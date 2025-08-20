"use client";

import { useActionState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";


async function signupAction(prevState: string | null, formData: FormData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axios.post("http://localhost:4000/user/signup", {
      username,
      email,
      password,
    });
    if (res.status !== 201) throw new Error("Erreur lors de l inscription");
    return "✅ Inscription réussie";
  } catch (error: unknown) {
    console.error("Error signing up:", error);

    if (error instanceof Error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return axiosError.response?.data?.message || error.message || "Erreur lors de l'inscription ❌";
    }
    return "Erreur lors de l'inscription ❌";
  }

  export default function SignupPage() {
    const [state, formAction] = useActionState(signupAction, null);
    const router = useRouter();

    useEffect(() => {
      if (state && state.includes("✅")) {
        router.push("/products");
      }
    }, [state, router]);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-6">
        <Link href="/" className="text-3xl font-bold text-gray-800 mb-8 hover:text-blue-600 transition">
          ShopV2
        </Link>

        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
            Créer un compte ✨
          </h1>

          <form action={formAction} className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              placeholder="Nom d utilisateur"
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition"
            >
              S inscrire
            </button>
          </form>

          {state && (
            <p
              className={`mt-4 text-center font-medium ${state.includes("✅") ? "text-green-600" : "text-red-600"
                }`}
            >
              {state}
            </p>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600">Déjà un compte ?</p>
            <Link
              href="/users/login"
              className="mt-2 inline-block bg-green-600 text-white px-5 py-2 rounded-xl shadow hover:bg-green-700 transition"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    );
  }
