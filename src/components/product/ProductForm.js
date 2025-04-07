import { Alert, Box, Button, Dialog, DialogActions, DialogTitle, Snackbar, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createProduct, updateProduct } from '../../services/productService';
import CurrencyTextField from '../others/CurrencyTextField';

const ProductForm = ({ selectedProduct, onFormSubmit, open, onClose }) => {
	const [formData, setFormData] = useState({ id: null, name: '', unitPrice: '' });
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		if (selectedProduct) {
			setFormData(selectedProduct);
		} else {
			setFormData({ id: null, name: '', unitPrice: '' });
		}
	}, [selectedProduct]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleChange = (index, field, value) => {
		setFormData({ ...formData, unitPrice: value });
	};

	const handleSubmit = async (event) => {
		try {
			let hasError = false;
			if (formData.name?.length < 3) {
				setErrorMessage('Nome inválido, mínimo de 3 caracteres');
				hasError = true;
			}
			if (formData.name?.length > 50 && !hasError) {
				setErrorMessage('Nome inválido, máximo de 50 caracteres');
				hasError = true;
			}
			if (formData.unitPrice <= 0 && !hasError) {
				setErrorMessage('Valor inválido, tem que ser maior que 0');
				hasError = true;
			}
			event.preventDefault();
			if(!hasError){
				if (formData.id) {
					await updateProduct(formData.id, { name: formData.name, unitPrice: formData.unitPrice });
				} else {
					await createProduct({ name: formData.name, unitPrice: formData.unitPrice });
				}
				onFormSubmit();
				setFormData({ id: null, name: '' });
			}
		} catch (error) {
			onFormSubmit(error);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>{formData.id ? 'Editar Consumidor' : 'Novo Consumidor'}</DialogTitle>
			<Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, paddingLeft: 4, paddingRight: 4, paddingBottom: 4 }}>
				<TextField
					fullWidth
					label="Nome"
					name="name"
					value={formData.name}
					onChange={handleInputChange}
					required
					sx={{ mb: 2 }}
				/>
				<CurrencyTextField
					value={formData.unitPrice}
					index={0}
					handleChange={handleChange}
				/>
				<DialogActions>
					<Button onClick={onClose} variant="contained" color="error">
						Cancelar
					</Button>
					<Button type="submit" variant="contained" color="primary">
						{formData.id ? 'Atualizar' : 'Salvar'}
					</Button>
				</DialogActions>
				<Snackbar open={Boolean(errorMessage)} autoHideDuration={2000} onClose={() => setErrorMessage(null)}>
					<Alert severity="error" sx={{ width: '100%' }}>
						Erro: {errorMessage}
					</Alert>
				</Snackbar>
			</Box>
		</Dialog>
	);
};

export default ProductForm;