import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const navigate = useNavigate();

	const handleNavigation = (path) => {
		navigate(path);
	};

	return (
		<Box
			sx={{
				minHeight: '100vh',
				background: 'linear-gradient(135deg, #6C63FF, #3F3D56)',
				color: '#FFFFFF',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
			}}
		>
			<Container maxWidth="md">
				<Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
					Bem-vindo ao Sistema de Gerenciamento de Vendas
				</Typography>
				<Typography variant="h6" component="p" sx={{ mb: 4 }}>
					Gerencie Vendas, Consumidores, e Produtos.
				</Typography>
				<Grid container spacing={3} justifyContent="center">
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							onClick={() => handleNavigation('/consumer')}
							sx={{
								fontSize: '1rem',
								textTransform: 'none',
								padding: '10px 20px',
								backgroundColor: '#FF6584',
								'&:hover': { backgroundColor: '#FF416C' },
							}}
						>
							Consumidores
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							onClick={() => handleNavigation('/product')}
							sx={{
								fontSize: '1rem',
								textTransform: 'none',
								padding: '10px 20px',
								backgroundColor: '#00C9A7',
								'&:hover': { backgroundColor: '#00A682' },
							}}
						>
							Produtos
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							onClick={() => handleNavigation('/sale')}
							sx={{
								fontSize: '1rem',
								textTransform: 'none',
								padding: '10px 20px',
								backgroundColor: '#FFA500',
								'&:hover': { backgroundColor: '#FF8500' },
							}}
						>
							Vendas
						</Button>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default HomePage;