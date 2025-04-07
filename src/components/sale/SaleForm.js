import DeleteIcon from '@mui/icons-material/Delete';
import {
	Alert,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Snackbar,
	TextField,
	Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getConsumers } from '../../services/consumerService';
import { getProducts } from '../../services/productService';
import { createSale, updateSale } from '../../services/saleService';
import CurrencyTextField from '../others/CurrencyTextField';

const SaleForm = ({ open, onClose, selectedSale, onFormSubmit }) => {
	const [formData, setFormData] = useState({ consumerId: '', branch: '', items: [] });
	const [consumers, setConsumers] = useState([]);
	const [products, setProducts] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		if (selectedSale) {
			setFormData(selectedSale);
		} else {
			setFormData({ consumerId: null, branch: '', items: [] });
		}
	}, [selectedSale]);

	const loadData = async () => {
		const consumersResponse = await getConsumers();
		const productsResponse = await getProducts();
		setConsumers(consumersResponse.data);
		setProducts(productsResponse.data);
	};

	const handleFieldChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleItemChange = (index, field, value) => {
		const updatedItems = [...formData.items];
		updatedItems[index][field] = value;
		setFormData({ ...formData, items: updatedItems });
	};

	const addItem = () => {
		setFormData({
			...formData,
			items: [...formData.items, { productId: '', quantity: 1, unitPrice: 0 }]
		});
	};

	const removeItem = (index) => {
		const updatedItems = formData.items.filter((_, i) => i !== index);
		setFormData({ ...formData, items: updatedItems });
	};

	const handleSubmit = async (event) => {
		try {
			let hasError = false;
			if (formData.consumerId === null) {
				setErrorMessage('É necessário selecionar um consumidor');
				hasError = true;
			}
			if (formData.branch?.length < 3 && !hasError) {
				setErrorMessage('Nome inválido, mínimo de 3 caracteres');
				hasError = true;
			}
			if (formData.branch?.length > 50 && !hasError) {
				setErrorMessage('Nome inválido, máximo de 50 caracteres');
				hasError = true;
			}
			if (formData.items.length === 0 && !hasError) {
				setErrorMessage('É necessário ao menos um item na venda');
				hasError = true;
			}
			if(formData.items.some(item => item.quantity <= 0) && !hasError) {
				let rowsQuantityZero = null;
				formData.items.forEach((item, index) => {
					if(!rowsQuantityZero) {
						rowsQuantityZero += `, `
					}
					if(item.quantity <= 0) {
						rowsQuantityZero += `${index + 1}`;
					}
				});
				setErrorMessage(`Quantidade inválida na(s) linha(s) ${rowsQuantityZero}`);
				hasError = true;
			}
			event.preventDefault();
			if(!hasError){
				if (formData.id) {
					await updateSale(formData.id, formData);
				} else {
					await createSale(formData);
				}
				onFormSubmit();
				setFormData({ consumerId: null, branch: '', items: [] });
			}
		} catch (error) {
			onFormSubmit(error);
		}
	};

	const calculateDiscount = (item) => {
		let discount = 0;
		const total = item.quantity * item.unitPrice;
		if(item.quantity >= 10) {
			discount = total * 0.2;
		} else if(item.quantity >= 5) {
			discount = total * 0.1;
		}
		return discount;
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
			<DialogTitle>{formData.id ? 'Editar Venda' : 'Nova Venda'}</DialogTitle>
			<Box component="form" onSubmit={handleSubmit} sx={{ p: 6 }}>
				<Box sx={{ display: 'flex', gap: 2 }}>
					<FormControl fullWidth required>
						<InputLabel>Consumidor</InputLabel>
						<Select
							required
							disabled={selectedSale?.status === 2}
							name="consumerId"
							value={formData.consumerId}
							label="Consumidor"
							onChange={handleFieldChange}
						>
							{consumers.map((c) => (
								<MenuItem key={c.id} value={c.id}>
									{c.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						fullWidth
						disabled={selectedSale?.status === 2}
						label="Filial"
						name="branch"
						value={formData.branch}
						onChange={handleFieldChange}
						required
					/>
				</Box>
				<Button onClick={addItem} sx={{ mt: 3 }} variant="outlined" style={{ display: selectedSale?.status === 2 ? 'none' : 'block' }}>
					Adicionar Item
				</Button>
				{formData.items.map((item, index) => (
					<Box
						key={index}
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							alignItems: 'center',
							gap: 2,
							mt: 2,
						}}
					>
						<FormControl sx={{ minWidth: 180, flex: 1 }}>
							<InputLabel>Produto</InputLabel>
							<Select
								disabled={selectedSale?.status === 2}
								required
								value={item.productId}
								onChange={(e) => {
									handleItemChange(index, 'productId', e.target.value);
									const selProduct = products.find((p) => p.id === e.target.value);
									formData.items[index].unitPrice = selProduct.unitPrice;
								}}
							>
								{products.map((p) => (
									<MenuItem key={p.id} value={p.id}>
										{p.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							label="Quantidade"
							type="number"
							disabled={selectedSale?.status === 2}
							sx={{ maxWidth: 120 }}
							value={item.quantity}
							onChange={(e) => {
								if(e.target.value > 20) {
									setErrorMessage('Quantidade inválida (máximo de 20 items)');
								} else {
									handleItemChange(index, 'quantity', parseInt(e.target.value, 10));
								}
							}}
							required
						/>
						<Box sx={{ maxWidth: 180, flex: 1 }}>
							<CurrencyTextField
								disabled={selectedSale?.status === 2}
								value={item.unitPrice}
								index={index}
								handleChange={handleItemChange}
							/>
						</Box>
						<Box sx={{ minWidth: 160 }}>
							<Typography>
								Total: R$ {(item.quantity * item.unitPrice).toFixed(2)}
							</Typography>
						</Box>
						<Box sx={{ minWidth: 160 }}>
							<Typography>
								Desconto: R$ {calculateDiscount(item).toFixed(2)}
							</Typography>
						</Box>
						<IconButton onClick={() => removeItem(index)} color="error" disabled={selectedSale?.status === 2}>
							<DeleteIcon />
						</IconButton>
					</Box>
				))}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mt: 4,
						px: 3,
					}}
				>
					<Typography variant="h6">
						Valor Total: R$ 
						{formData.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0).toFixed(2)}{' '}
						(R$ {formData.items.reduce((acc, item) => acc + item.quantity * item.unitPrice - calculateDiscount(item), 0).toFixed(2)} com desconto)
					</Typography>
					<Typography variant="h6">
						Desconto Total: R$ {formData.items.reduce((acc, item) => acc + calculateDiscount(item), 0).toFixed(2)}
					</Typography>
					<DialogActions>
						<Button onClick={onClose} variant="contained" color="error">
							{selectedSale?.status === 2 ? 'Fechar' : 'Cancelar'}
						</Button>
						<Button disabled={selectedSale?.status === 2} onClick={handleSubmit} type="submit" variant="contained" color="primary">
							{formData.id ? 'Atualizar' : 'Salvar'}
						</Button>
					</DialogActions>
					<Snackbar open={Boolean(errorMessage)} autoHideDuration={2000} onClose={() => setErrorMessage(null)}>
						<Alert severity="error" sx={{ width: '100%' }}>
							Erro: {errorMessage}
						</Alert>
					</Snackbar>
				</Box>
			</Box>
		</Dialog>
	);
};

export default SaleForm;
