export const cutOverview = (data: string) => {
	let truncatedOverview = data.slice(0, 100);
	let lastSpaceIndex = truncatedOverview.lastIndexOf(' ');

	if (lastSpaceIndex !== -1) {
		truncatedOverview = truncatedOverview.slice(0, lastSpaceIndex) + '...';
	}

	return truncatedOverview;
};
