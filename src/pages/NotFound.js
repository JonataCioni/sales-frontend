import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate('/');
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
				textAlign: 'center',
				background: 'linear-gradient(135deg, #e09, #d0e)',
				color: '#fff',
				padding: 3,
			}}
		>
			<Typography variant="h1" component="h1" sx={{ fontSize: '6rem', fontWeight: 700 }}>
				404
			</Typography>
			<Typography variant="h5" component="p" sx={{ mb: 2 }}>
				Oops! Essa pagina não existe.
			</Typography>
			<Typography variant="body1" component="p" sx={{ mb: 4 }}>
				Você pode ter digitado o endereço incorretamente ou a página pode ter sido movida.
			</Typography>
			<Button
				variant="contained"
				color="primary"
				size="large"
				onClick={handleGoHome}
				sx={{
					textTransform: 'none',
					fontSize: '1.2rem',
					backgroundColor: '#6c63ff',
					':hover': { backgroundColor: '#5753c9' },
				}}
			>
				Ir para a Home
			</Button>
		</Box>
	);
};

export default NotFound;