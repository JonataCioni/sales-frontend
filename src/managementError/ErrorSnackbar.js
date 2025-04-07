import { Alert, Snackbar } from '@mui/material';
import React from 'react';

const ErrorSnackbar = ({ errorMessage, onClose }) => {
	let message = null;
	if(errorMessage?.code === 'ERR_NETWORK') {
		message = 'Não foi possivel conectar ao servidor';
	} else {
		message = 'Erro Inesperado';
	}
	return (
		<Snackbar open={Boolean(errorMessage)} autoHideDuration={6000} onClose={onClose}>
			<Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
				{errorMessage?.code}: {message}
			</Alert>
		</Snackbar>
	);
};

export default ErrorSnackbar;