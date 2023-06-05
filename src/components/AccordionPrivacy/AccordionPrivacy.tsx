import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { AccordionProps } from '../../types/types';
import styles from './accordionPrivacy.module.scss';

const AccordionPrivacy: React.FC<AccordionProps> = ({ title, content }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.accordion}>
			<div className={styles.accordionHeader} onClick={handleToggle}>
				<h3>{title}</h3>
				<span className={styles.accordionArrow}>
					{' '}
					{isOpen ? (
						<FontAwesomeIcon icon={faChevronUp} />
					) : (
						<FontAwesomeIcon icon={faChevronDown} />
					)}
				</span>
			</div>
			{isOpen && (
				<div className={styles.accordionContent}>
					<p className={styles.content}>{content}</p>
				</div>
			)}
		</div>
	);
};

export default AccordionPrivacy;
