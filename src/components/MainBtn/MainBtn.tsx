import React from 'react';
import { BtnProps } from '../../types/types';
import styles from './mainBtn.module.scss';

const MainBtn: React.FC<BtnProps> = ({ name, onClick }) => {
	return (
		<div className={styles.longButtonContainer}>
			<button className={styles.longButton} onClick={onClick}>
				{name}
			</button>
		</div>
	);
};

export default MainBtn;
