import { TextField } from '@mui/material';
import React from 'react';
import { formatCpf } from '../../utils';

const CpfTextField = ({ value, onChange, name = 'cpf', ...props }) => {
	const handleChange = (e) => {
		const rawValue = e.target.value;
		const formattedValue = formatCpf(rawValue);
		onChange({
			target: {
				name,
				value: formattedValue,
			},
		});
	};

	return (
		<TextField
			fullWidth
			label="CPF"
			variant="outlined"
			name={name}
			value={value}
			onChange={handleChange}
			inputProps={{ maxLength: 14 }}
			{...props}
		/>
	);
};

export default CpfTextField;