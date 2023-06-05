import React from 'react';
import styles from './footer.module.scss';

const Footer: React.FC = () => {
	return (
		<footer className={styles.footer}>
			<p>© 2023 Flicker. All rights reserved.</p>
		</footer>
	);
};

export default Footer;
