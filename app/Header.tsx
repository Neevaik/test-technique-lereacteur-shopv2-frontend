"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  username: string;
  email: string;
  role?: "admin" | "user";
}

interface HeaderProps {
  cartTotal: number;
}

export default function Header({ cartTotal }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("http://localhost:4000/user/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  async function handleLogout() {
    try {
      await axios.post(
        "http://localhost:4000/user/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (err) {
      console.error("Erreur lors de la déconnexion", err);
    }
  }

  return (
    <header className="bg-gray-50 shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-gray-900">
        ShopV2
      </Link>

      <div className="flex items-center gap-3">
        <Link
          href="/cart"
          className="relative bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Panier
          {cartTotal > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartTotal}
            </span>
          )}
        </Link>

        {user?.role === "admin" && (
          <Link
            href="/admin"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Admin
          </Link>
        )}

        {user ? (
          <>
            <span className="text-gray-700 font-medium">{user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link
              href="/users/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Se connecter
            </Link>
            <Link
              href="/users/signup"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Créer un compte
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
