import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ConsumerForm from '../components/consumer/ConsumerForm';
import ConsumerList from '../components/consumer/ConsumerList';
import ErrorSnackbar from '../managementError/ErrorSnackbar';
import { getConsumers } from '../services/consumerService';

const ConsumerPage = () => {
    const [error, setError] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [consumers, setConsumers] = useState([]);
    const [selectedConsumer, setSelectedConsumer] = useState(null);
    const [actionFinished, setActionFinished] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await getConsumers();
                setConsumers(response.data);
            } catch (error) {
                setError(error);
            }    
            setLoading(false);
        }
        getData();
    }, [actionFinished]);

    const handleAdd = () => {
        setSelectedConsumer(null);
        handleOpenPopup();
    };

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const handleEdit = (consumer) => {
        setSelectedConsumer(consumer);
        handleOpenPopup();
        setActionFinished(Math.random());
    };

    const handleRemove = (id) => {
        setActionFinished(id);
    };

    const onFormSubmit = (error) => {
        setSelectedConsumer(null);
        handleClosePopup();
        setActionFinished(Math.random());
        setError(error);
    };

    const handleErrorClose = () => {
        setError(null);
    };

    return (
        <Box sx={{ maxWidth: '75%', mx: 'auto', mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handleAdd}>
                Adicionar Consumidor
            </Button>
            <ConsumerForm
                open={isPopupOpen}
                onClose={handleClosePopup}
                selectedConsumer={selectedConsumer}
                onFormSubmit={onFormSubmit}
            />
            <ConsumerList
                loading={loading}
                consumers={consumers}
                onEdit={handleEdit}
                onRemove={handleRemove}
            />
            <ErrorSnackbar errorMessage={error} onClose={handleErrorClose} />
        </Box>
    );
};

export default ConsumerPage;