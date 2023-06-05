interface GetTrailerProps {
	results: [
		{
			type: string;
		}
	];
}

export const getTrailer = (lookForTrailer: GetTrailerProps) => {
	let trailerKey = '';
	lookForTrailer.results.forEach((result: any) => {
		if (result.official && result.type === 'Trailer') {
			trailerKey = result.key;
			return;
		} else if (result.type === 'Trailer') {
			trailerKey = result.key;
			return;
		}
	});

	return trailerKey;
};
