export const getCircleRateColor = (getColor: number) => {
	const rating = Math.round(getColor * 10);
	return rating >= 70
		? 'green'
		: rating >= 40
		? 'yellow'
		: rating > 0
		? 'red'
		: 'gray';
};
