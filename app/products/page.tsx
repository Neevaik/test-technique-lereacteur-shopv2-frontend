"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Header from "../Header";


interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("http://localhost:4000/products");
        setProducts(res.data);
      } catch (err: any) {
        setError("Impossible de charger les produits ❌");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <>
    <Header cartTotal={0}/>
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Nos Produits
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">
            Aucun produit disponible pour le moment 😔
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow p-4 flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-4 text-center">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-blue-600 mb-4">
                  {product.price.toFixed(2)} €
                </p>
                <Link
                  href={`/products/${product._id}`}
                  className="bg-green-600 text-white px-5 py-2 rounded-xl shadow hover:bg-green-700 transition"
                >
                  Voir le produit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
