import React from 'react';
import AccordionPrivacy from '../AccordionPrivacy/AccordionPrivacy';
import styles from './privacyInfo.module.scss';

const PrivacyInfo: React.FC = () => {
	return (
		<div>
			<div className={styles.accordionBox}>
				<AccordionPrivacy
					title={'§1. General provisions'}
					content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices sapien vel velit aliquam, posuere varius enim bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas et maximus felis. Fusce mi risus, tincidunt in justo in, dictum tristique nisi. Nulla quis libero rhoncus, tempus mi sit amet, faucibus dui. Sed nunc ligula, lacinia et tristique quis, dapibus vitae lorem. Maecenas aliquet eleifend tellus, at gravida diam pulvinar a.`}
				/>
			</div>
			<div className={styles.accordionBox}>
				<AccordionPrivacy
					title={'§2. Application Terms of Use'}
					content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices sapien vel velit aliquam, posuere varius enim bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas et maximus felis. Fusce mi risus, tincidunt in justo in, dictum tristique nisi. Nulla quis libero rhoncus, tempus mi sit amet, faucibus dui. Sed nunc ligula, lacinia et tristique quis, dapibus vitae lorem. Maecenas aliquet eleifend tellus, at gravida diam pulvinar a.`}
				/>
			</div>
			<div className={styles.accordionBox}>
				<AccordionPrivacy
					title={'§3. Rights and obligations of Application users'}
					content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices sapien vel velit aliquam, posuere varius enim bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas et maximus felis. Fusce mi risus, tincidunt in justo in, dictum tristique nisi. Nulla quis libero rhoncus, tempus mi sit amet, faucibus dui. Sed nunc ligula, lacinia et tristique quis, dapibus vitae lorem. Maecenas aliquet eleifend tellus, at gravida diam pulvinar a.`}
				/>
			</div>
			<div className={styles.accordionBox}>
				<AccordionPrivacy
					title={'§4. Responsibility'}
					content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices sapien vel velit aliquam, posuere varius enim bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas et maximus felis. Fusce mi risus, tincidunt in justo in, dictum tristique nisi. Nulla quis libero rhoncus, tempus mi sit amet, faucibus dui. Sed nunc ligula, lacinia et tristique quis, dapibus vitae lorem. Maecenas aliquet eleifend tellus, at gravida diam pulvinar a.`}
				/>
			</div>
			<div className={styles.accordionBox}>
				<AccordionPrivacy
					title={'§5. Termination of using the Application'}
					content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices sapien vel velit aliquam, posuere varius enim bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas et maximus felis. Fusce mi risus, tincidunt in justo in, dictum tristique nisi. Nulla quis libero rhoncus, tempus mi sit amet, faucibus dui. Sed nunc ligula, lacinia et tristique quis, dapibus vitae lorem. Maecenas aliquet eleifend tellus, at gravida diam pulvinar a.`}
				/>
			</div>
			<div className={styles.accordionBox}>
				<AccordionPrivacy
					title={'§6. Final Provisions'}
					content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices sapien vel velit aliquam, posuere varius enim bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas et maximus felis. Fusce mi risus, tincidunt in justo in, dictum tristique nisi. Nulla quis libero rhoncus, tempus mi sit amet, faucibus dui. Sed nunc ligula, lacinia et tristique quis, dapibus vitae lorem. Maecenas aliquet eleifend tellus, at gravida diam pulvinar a.`}
				/>
			</div>
		</div>
	);
};

export default PrivacyInfo;
