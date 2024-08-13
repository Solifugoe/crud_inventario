import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; // Asegúrate de importar un archivo CSS para los estilos

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://66bb949e6a4ab5edd638d3e8.mockapi.io/stockproducts');
            setProducts(response.data);
        } catch (error) {
            setError('Error fetching products');
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (products.length === 0) {
        return <p>No hay productos en stock</p>;
    }

    return (
        <div className="home-container">
            <h1 style={{ textAlign: 'center' }}>Productos en Stock</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-stock">Stock: {product.stock}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
