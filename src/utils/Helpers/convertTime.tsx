export const convertTime = (timeToConvert: number) => {
	if (timeToConvert !== undefined) {
		const hours = Math.floor(timeToConvert / 60);
		const minutes = timeToConvert % 60;
		return hours + 'h ' + minutes + 'min';
	} else {
		return '';
	}
};
