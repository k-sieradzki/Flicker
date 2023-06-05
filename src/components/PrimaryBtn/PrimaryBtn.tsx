import React from 'react';
import { BtnProps } from '../../types/types';
import styles from './primaryBtn.module.scss';

const PrimaryBtn: React.FC<BtnProps> = ({ name, onClick }) => {
	return (
		<div className={styles.primaryButtonContainer}>
			<button className={styles.primaryButton} onClick={onClick}>
				{name}
			</button>
		</div>
	);
};

export default PrimaryBtn;
