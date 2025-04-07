import CancelIcon from '@mui/icons-material/Cancel';
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
import { deleteSale, updateSale } from '../../services/saleService';

const SaleList = ({ loading, sales, onEdit, onActionFinished }) => {
	const handleCancel = async (id, sale) => {
		if (window.confirm('Deseja cancelar esta venda?')) {
			await updateSale(id, { ...sale, status: 2 });
			onActionFinished();
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm('Deseja excluir esta venda?')) {
			await deleteSale(id);
			onActionFinished();
		}
	};

	return (
		<Box sx={{ mt: 4 }}>
			<Typography variant="h5" gutterBottom>
				Listagem de Vendas
			</Typography>
			{loading && <Typography>Carregando...</Typography>}
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Número</TableCell>
							<TableCell>Data</TableCell>
							<TableCell>Filial</TableCell>
							<TableCell>Valor Total</TableCell>
							<TableCell>Desconto Total</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Items</TableCell>
							<TableCell align="center">Ações</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sales.map((sale) => (
							<TableRow key={sale.id} style={{ backgroundColor: sale.status === 2 ? '#ff00003b' : 'inherit' }}>
								<TableCell>{sale.id}</TableCell>
								<TableCell>{sale.saleNumber}</TableCell>
								<TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
								<TableCell>{sale.branch}</TableCell>
								<TableCell>R$ {sale.total.toFixed(2)}</TableCell>
								<TableCell>R$ {sale.totalDiscount.toFixed(2)}</TableCell>
								<TableCell>{sale.status === 1 ? 'Ativa' : 'Cancelada'}</TableCell>
								<TableCell>{sale.items.length}</TableCell>
								<TableCell align="center">
									<IconButton onClick={() => onEdit(sale)} color="primary">
										<EditIcon />
									</IconButton>
									<IconButton disabled={sale.status === 2} onClick={() => handleDelete(sale.id)} color="error">
										<DeleteIcon />
									</IconButton>
									<IconButton disabled={sale.status === 2} onClick={() => handleCancel(sale.id, sale)} color="error">
										<CancelIcon />
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

export default SaleList;
