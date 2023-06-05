import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProgramDescription from '../ProgramDescription/ProgramDescription';
import ProgramRelated from '../ProgramRelated/ProgramRelated';
import CastComponent from '../CastComponent/CastComponent';
import { RootState } from '../../services/redux/store';
import { ProgramComponentProps } from '../../types/types';
import styles from './programComponent.module.scss';

const ProgramComponent: React.FC<ProgramComponentProps> = ({
	handleModal,
	convertedTime,
	rateColor,
	production,
}) => {
	const getProgramID = useSelector((state: RootState) => state.app.programID);
	const [related, setRelated] = useState<boolean>(true);
	const [details, setDetails] = useState<boolean>(false);

	const handleToggle = (isRelated: boolean) => {
		setRelated(isRelated);
		setDetails(!isRelated);
	};

	return (
		<div className={styles.programMainContainer}>
			<div className={styles.wrapper}>
				{Object.keys(production).length !== 0 && (
					<ProgramDescription
						production={production}
						rateColor={rateColor}
						convertTime={convertedTime}
						handleModal={handleModal}
					/>
				)}
				<div className={styles.categoryBtns}>
					<button
						className={`${styles.relatedBtn} ${
							related ? styles.activeBtn : null
						}`}
						onClick={() => {
							handleToggle(true);
						}}
					>
						Related
					</button>
					<button
						className={`${styles.detailsBtn} ${
							details ? styles.activeBtn : null
						}`}
						onClick={() => {
							handleToggle(false);
						}}
					>
						Details
					</button>
				</div>

				{Object.keys(production).length !== 0 && related && (
					<ProgramRelated production={production} getProgramID={getProgramID} />
				)}
				{details && <CastComponent team={production.credits} />}
			</div>
		</div>
	);
};

export default ProgramComponent;
