"use client";
import { useActionState } from "react";
import axios from "axios";

async function signupAction(prevState: string | null, formData: FormData) {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
        const res = await axios.post("http://localhost:4000/user/signup", {
            username,
            email,
            password
        });
        if (res.status !== 201) throw new Error("Erreur lors de l'inscription");
        return "Inscription réussie ✅";
    } catch (error: any) {
        console.error("Error signing up:", error);
        return error.response?.data?.message || "Erreur lors de l'inscription ❌";
    }
}

export default function SignupPage() {

    const [state, formAction] = useActionState(signupAction, null);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Créer un compte</h1>

            <form action={formAction} className="flex flex-col gap-4 w-80">
                <input
                    type="text"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    className="border p-2 rounded"
                    required
                />
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
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    S'inscrire
                </button>
            </form>

            {state && <p className="mt-4 text-sm text-red-600">{state}</p>}
        </div>
    );
}
