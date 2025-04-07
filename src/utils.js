export const formatCpf = (value) => {
	if (!value) return '';
	value = value.replace(/\D/g, '').slice(0, 11);
	if (value.length >= 10) {
		return value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
	} else if (value.length >= 7) {
		return value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
	} else if (value.length >= 4) {
		return value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
	}
	return value;
};