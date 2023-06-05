import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PrivacyInfo from '../../components/PrivacyInfo/PrivacyInfo';
import DarkModeSettings from '../../components/DarkModeSettings/DarkModeSettings';
import EditProfile from '../../components/EditProfile/EditProfile';
import DeleteAccount from '../../components/DeleteAccount/DeleteAccount';
import styles from './userProfile.module.scss';

const UserProfile: React.FC = () => {
	const sections = [
		{ key: 'account', name: 'Account' },
		{ key: 'darkMode', name: 'Dark Mode' },
		{ key: 'privacy', name: 'Privacy' },
		{ key: 'deleteAcc', name: 'Goodbye' },
	];

	const [activeSection, setActiveSection] = useState<string>(sections[0].key);

	const handleSectionClick = (sectionKey: string) => {
		setActiveSection(sectionKey);
	};

	const isSectionActive = (sectionKey: string) => {
		return activeSection === sectionKey;
	};

	return (
		<div className={styles.userProfileContainer}>
			<Navbar />
			<div className={styles.wrapper}>
				<div className={styles.profileNav}>
					{sections.map(section => (
						<p
							key={section.key}
							className={`${styles.profileNavOption} ${
								isSectionActive(section.key) ? styles.active : ''
							}`}
							onClick={() => handleSectionClick(section.key)}
						>
							{section.name}
						</p>
					))}
				</div>

				{isSectionActive('account') && (
					<div className={styles.profileSettingsContainer}>
						<EditProfile />
					</div>
				)}

				{isSectionActive('darkMode') && (
					<div className={styles.profileSettingsContainer}>
						<DarkModeSettings />
					</div>
				)}

				{isSectionActive('privacy') && (
					<div className={styles.profileSettingsContainer}>
						<PrivacyInfo />
					</div>
				)}

				{isSectionActive('deleteAcc') && (
					<div className={styles.profileSettingsContainer}>
						<DeleteAccount />
					</div>
				)}
			</div>
		</div>
	);
};

export default UserProfile;
