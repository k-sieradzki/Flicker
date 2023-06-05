import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { ProgramModalProps } from '../../types/types';
import { customStyles } from './settings';
import styles from './programModal.module.scss';

const ProgramModal: React.FC<ProgramModalProps> = ({
	showModal,
	handleModal,
	trailer,
}) => (
	<Modal
		className={styles.modal}
		isOpen={showModal}
		style={customStyles}
		ariaHideApp={false}
		onRequestClose={handleModal}
	>
		<div className='div'>
			<div className={styles.iframeTitle}>
				<p>Trailer</p>
				<button className={styles.closeModalBtn} onClick={() => handleModal()}>
					<FontAwesomeIcon icon={faXmark} />
				</button>
			</div>
			<iframe
				className={styles.video}
				src={`https://www.youtube.com/embed/${trailer}`}
				title='YouTube video player'
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				allowFullScreen
			></iframe>
		</div>
	</Modal>
);

export default ProgramModal;
