"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "../components/Header";


interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

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

    const handlClick = (id: string) => {
        console.log("Produit sélectionné :", id);
        router.push(`/products/${id}`);
    }

    return (
        <>
            <Header />
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
                                    className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="w-full h-48 object-cover rounded-xl mb-4"
                                    />
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                        {product.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 text-center">
                                        {product.description}
                                    </p>
                                    <p className="text-lg font-bold text-blue-600 mb-4">
                                        {product.price.toFixed(2)} €
                                    </p>
                                    <button
                                        onClick={() => handlClick(product._id)}>
                                        Voir le produit
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
