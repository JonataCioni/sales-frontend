import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import React from 'react';
import { deleteConsumer } from '../../services/consumerService';

const ConsumerList = ({ loading, onEdit, consumers, onRemove }) => {

	const handleDelete = async (id) => {
		if (window.confirm('Tem certeza que deseja excluir esse autor?')) {
			await deleteConsumer(id);
			onRemove(id);
		}
	};

	const formatCpf = (cpf) => {
		if (!cpf) return '';
		const cleaned = cpf.replace(/\D/g, '');
		return cleaned.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
	}

	return (
		<Box sx={{ mt: 4 }}>
			<Typography variant="h5" component="h2" gutterBottom>
				Consumidores
			</Typography>
			{loading && <Typography>Carregando...</Typography>}
			<TableContainer component={Paper} sx={{ mt: 2 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="left" sx={{ width: '5%' }}>ID</TableCell>
							<TableCell align="left" sx={{ width: '50%' }}>Nome</TableCell>
							<TableCell align="left" sx={{ width: '36%' }}>Documento</TableCell>
							<TableCell align="center" sx={{ width: '9%' }}>Ações</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{consumers.map((consumer) => (
							<TableRow key={consumer.id}>
								<TableCell align="left" sx={{ width: '5%' }}>{consumer.id}</TableCell>
								<TableCell align="left" sx={{ width: '50%' }}>{consumer.name}</TableCell>
								<TableCell align="left" sx={{ width: '36%' }}>{formatCpf(consumer.document)}</TableCell>
								<TableCell align="center" sx={{ width: '9%' }}>
									<IconButton onClick={() => onEdit(consumer)} aria-label="edit" color="primary">
										<EditIcon />
									</IconButton>
									<IconButton onClick={() => handleDelete(consumer.id)} aria-label="delete" color="error">
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default ConsumerList;