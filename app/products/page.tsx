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
    const [searchTerm, setSearchTerm] = useState("");
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

    const handleClick = (id: string) => {
        router.push(`/products/${id}`);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
                        Nos Produits
                    </h1>

                    <div className="mb-6 flex justify-center">
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-md p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {filteredProducts.length === 0 ? (
                        <p className="text-center text-gray-600 text-xl">
                            Aucun produit trouvé 😔
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product._id}
                                    className="bg-white rounded-2xl shadow p-4 flex flex-col items-center"
                                >
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
                                        onClick={() => handleClick(product._id)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                                    >
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
