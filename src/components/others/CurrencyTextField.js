import { TextField } from '@mui/material';
import React from 'react';
import { NumericFormat } from 'react-number-format';

const CurrencyTextField = ({ value, index, handleChange, disabled }) => {
	return (
		<NumericFormat
			fullWidth
			disabled={disabled}
			customInput={TextField}
			label="Valor"
			thousandSeparator="."
			decimalSeparator=","
			prefix="R$ "
			value={value}
			onValueChange={(values) => {
				handleChange(index, 'value', values.floatValue);
			}}
			required
		/>
	);
}

export default CurrencyTextField;