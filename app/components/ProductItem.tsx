"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "next/navigation";

export default function ProductsPage() {
    const params = useParams();
    const { id } = params;

    const [product, setProduct] = useState<{
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
    } | null>(null);

    useEffect(() => {
        const randomPrice = Math.floor(Math.random() * 100) + 10;
        setProduct({
            id: id as string,
            name: `Produit ${id}`,
            description: `Ceci est la description du produit ${id}.`,
            price: randomPrice,
            image: `https://picsum.photos/seed/${id}/400/300`,
        });
    }, [id]);

    if (!product) return <p>Chargement...</p>;


    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
                <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md w-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="rounded-xl mb-4 w-full h-64 object-cover"
                    />
                    <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-lg font-semibold mb-6">{product.price} €</p>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </>
    );
}