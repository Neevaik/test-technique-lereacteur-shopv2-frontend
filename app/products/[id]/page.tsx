"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function ProductItem() {
    const params = useParams();
    const { id } = params;

    const [product, setProduct] = useState<{
        _id: string;
        title: string;
        description: string;
        price: number;
        thumbnail: string;
    } | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await axios.get(`http://localhost:4000/products/${id}`);
                setProduct(res.data);
                console.log("Produit récupéré :", res.data);
            } catch (err) {
                console.error("Erreur lors de la récupération du produit :", err);
            }
        }

        if (id) fetchProduct();
    }, [id]);

    if (!product) return <p>Chargement...</p>;

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
                <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md w-full">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        className="rounded-xl mb-4 w-full h-64 object-cover"
                    />
                    <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
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
