import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductForm from '../components/product/ProductForm';
import ProductList from '../components/product/ProductList';
import ErrorSnackbar from '../managementError/ErrorSnackbar';
import { getProducts } from '../services/productService';

const ProductPage = () => {
    const [error, setError] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [actionFinished, setActionFinished] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await getProducts();
                setProducts(response.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        getData();
    }, [actionFinished]);

    const handleAdd = () => {
        setSelectedProduct(null);
        setPopupOpen(true);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setPopupOpen(true);
    };

    const handleErrorClose = () => {
        setError(null);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const onFormSubmit = (error) => {
        setSelectedProduct(null);
        handleClosePopup();
        setActionFinished(Math.random());
        setError(error);
    };

    return (
		<Box sx={{ maxWidth: '75%', mx: 'auto', mt: 4 }}>
			<Button variant="contained" color="primary" onClick={handleAdd}>
				Adicionar Produto
			</Button>
            <ProductForm
                open={isPopupOpen}
                onClose={handleClosePopup}
                selectedProduct={selectedProduct}
                onFormSubmit={onFormSubmit}
            />
            <ProductList 
                loading={loading}
                products={products} 
                onEdit={handleEdit} 
                onActionFinished={() => setActionFinished(new Date())}
                setError={setError}
            />
			<ErrorSnackbar errorMessage={error} onClose={handleErrorClose} />
		</Box>
    );
};

export default ProductPage;