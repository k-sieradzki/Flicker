import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ProgramModal from '../../components/ProgramModal/ProgramModal';
import LoadingPage from '../LoadingPage/LoadingPage';
import ProgramComponent from '../../components/ProgramComponent/ProgramComponent';

import { useFetchProgram } from '../../utils/Hooks/useFetchProgram';

const Program: React.FC = () => {
	const { convertedTime, rateColor, production, fullyLoad, trailer } =
		useFetchProgram();

	const [showModal, setShowModal] = useState<boolean>(false);
	const handleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			{fullyLoad ? (
				<>
					<Navbar />
					<ProgramComponent
						handleModal={handleModal}
						convertedTime={convertedTime}
						rateColor={rateColor}
						production={production}
					/>
					<ProgramModal
						showModal={showModal}
						handleModal={handleModal}
						trailer={trailer}
					/>
					<Footer />
				</>
			) : (
				<LoadingPage />
			)}
		</>
	);
};

export default Program;
