import { Alert, Box, Button, Dialog, DialogActions, DialogTitle, Snackbar, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createConsumer, updateConsumer } from '../../services/consumerService';
import CpfTextField from '../others/CpfTextField';
import { formatCpf } from '../../utils';

const ConsumerForm = ({ selectedConsumer, onFormSubmit, open, onClose }) => {
	const [formData, setFormData] = useState({ id: null, name: '', document: '' });
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		if (selectedConsumer) {
			setFormData(selectedConsumer);
		} else {
			setFormData({ id: null, name: '', document: '' });
		}
	}, [selectedConsumer]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const isValidCpf = (cpf) => {
		if (!cpf) return false;
		cpf = cpf.replace(/[^\d]+/g, '');
		if (cpf.length !== 11) return false;
		if (/^(\d)\1{10}$/.test(cpf)) return false;
		let soma = 0;
		let resto;
		for (let i = 1; i <= 9; i++) {
			soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
		}
		resto = (soma * 10) % 11;
		if (resto === 10 || resto === 11) resto = 0;
		if (resto !== parseInt(cpf.substring(9, 10))) return false;
		soma = 0;
		for (let i = 1; i <= 10; i++) {
			soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
		}
		resto = (soma * 10) % 11;
		if (resto === 10 || resto === 11) resto = 0;
		if (resto !== parseInt(cpf.substring(10, 11))) return false;
		return true;
	}

	const handleSubmit = async (event) => {
		try {
			let hasError = false;
			if(formData.name?.length < 3){
				setErrorMessage('Nome inválido, mínimo de 3 caracteres');
				hasError = true;
			}
			if(formData.name?.length > 50 && !hasError){
				setErrorMessage('Nome inválido, máximo de 50 caracteres');
				hasError = true;
			}
			if(!isValidCpf(formData.document) && !hasError){
				setErrorMessage('CPF inválido');
				hasError = true;
			}
			event.preventDefault();
			if(!hasError){
				if (formData.id) {
					await updateConsumer(formData.id, { name: formData.name, document: formData.document.replace(/[.-]/g, '') });
				} else {
					await createConsumer({ name: formData.name, document: formData.document.replace(/[.-]/g, '') });
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
				<CpfTextField
					value={formatCpf(formData.document)}
					name="document"
					onChange={handleInputChange}
					required
					disabled={formData.id}
					sx={{ mb: 2 }}
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

export default ConsumerForm;