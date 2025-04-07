import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SaleForm from '../components/sale/SaleForm';
import SaleList from '../components/sale/SaleList';
import ErrorSnackbar from '../managementError/ErrorSnackbar';
import { getSales } from '../services/saleService';

const SalePage = () => {
    const [error, setError] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [sales, setSales] = useState([]);
    const [selectedSale, setSelectedSale] = useState(null);
    const [actionFinished, setActionFinished] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await getSales();
                setSales(response.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        getData();
    }, [actionFinished]);

    const handleAdd = () => {
        setSelectedSale(null);
        setPopupOpen(true);
    };

    const handleEdit = (sale) => {
        setSelectedSale(sale);
        setPopupOpen(true);
    };

    const handleErrorClose = () => {
        setError(null);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const onFormSubmit = (error) => {
        setSelectedSale(null);
        handleClosePopup();
        setActionFinished(Math.random());
        setError(error);
    };

    return (
		<Box sx={{ maxWidth: '75%', mx: 'auto', mt: 4 }}>
			<Button variant="contained" color="primary" onClick={handleAdd}>
				Adicionar Venda
			</Button>
            <SaleForm
                open={isPopupOpen}
                onClose={handleClosePopup}
                selectedSale={selectedSale}
                onFormSubmit={onFormSubmit}
            />
            <SaleList 
                loading={loading}
                sales={sales}
                onEdit={handleEdit} 
                onActionFinished={() => setActionFinished(new Date())}
                setError={setError}
            />
			<ErrorSnackbar errorMessage={error} onClose={handleErrorClose} />
		</Box>
    );
};

export default SalePage;