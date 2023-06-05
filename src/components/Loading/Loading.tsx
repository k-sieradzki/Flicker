import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loading: React.FC = () => {
	return (
		<>
			<RotatingLines
				strokeColor='red'
				strokeWidth='5'
				animationDuration='0.75'
				width='56'
				visible={true}
			/>
		</>
	);
};

export default Loading;
