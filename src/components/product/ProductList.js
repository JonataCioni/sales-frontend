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
import { deleteProduct } from '../../services/productService';

const ProductList = ({ loading, onEdit, products, onRemove }) => {

	const handleDelete = async (id) => {
		if (window.confirm('Tem certeza que deseja excluir esse produto?')) {
			await deleteProduct(id);
			onRemove(id);
		}
	};

	return (
		<Box sx={{ mt: 4 }}>
			<Typography variant="h5" component="h2" gutterBottom>
				Produtos
			</Typography>
			{loading && <Typography>Carregando...</Typography>}
			<TableContainer component={Paper} sx={{ mt: 2 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="left" sx={{ width: '5%' }}>ID</TableCell>
							<TableCell align="left" sx={{ width: '50%' }}>Nome</TableCell>
							<TableCell align="left" sx={{ width: '36%' }}>Preço Unitário</TableCell>
							<TableCell align="center" sx={{ width: '9%' }}>Ações</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products.map((product) => (
							<TableRow key={product.id}>
								<TableCell align="left" sx={{ width: '5%' }}>{product.id}</TableCell>
								<TableCell align="left" sx={{ width: '50%' }}>{product.name}</TableCell>
								<TableCell align="left" sx={{ width: '36%' }}>R$ {product.unitPrice.toFixed(2)}</TableCell>
								<TableCell align="center" sx={{ width: '9%' }}>
									<IconButton onClick={() => onEdit(product)} aria-label="edit" color="primary">
										<EditIcon />
									</IconButton>
									<IconButton onClick={() => handleDelete(product.id)} aria-label="delete" color="error">
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

export default ProductList;