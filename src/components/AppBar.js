import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
	const navLinks = [
		{ label: 'Home', path: '/' },
		{ label: 'Consumidores', path: '/consumer' },
		{ label: 'Produtos', path: '/product' },
		{ label: 'Vendas', path: '/sale' },
	];

	return (
		<AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
			<Toolbar>
				<Typography
					variant="h6"
					component="div"
					sx={{
						flexGrow: 1,
						fontWeight: 700,
						textTransform: 'uppercase',
						textDecoration: 'none',
					}}
				>
					Sistema de Vendas
				</Typography>
				<Box sx={{ display: 'flex', gap: 2 }}>
					{navLinks.map((link) => (
						<Button
							key={link.path}
							component={NavLink}
							to={link.path}
							color="inherit"
							sx={{
								textTransform: 'none',
								'&.active': { textDecoration: 'underline' },
							}}
						>
							{link.label}
						</Button>
					))}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default NavigationBar;