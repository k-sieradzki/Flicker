import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase/firebase';
import { signOut } from 'firebase/auth';
import { avatarDef } from '../../assets/images/images';
import { setProgramType } from '../../services/redux/reducers/reducer';
import { RootState } from '../../services/redux/store';
import useProfileData from '../../utils/Hooks/useProfileData';
import { ProfileDataProps } from '../../types/types';
import styles from './navbar.module.scss';

const Navbar: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const getProgramType = useSelector(
		(state: RootState) => state.app.programType
	);

	const profileData: ProfileDataProps | undefined = useProfileData() as
		| ProfileDataProps
		| undefined;
	const [showHamburger, setShowHamburger] = useState<boolean>(false);
	const [showProfileSettings, setShowProfileSettings] =
		useState<boolean>(false);
	const [isNavbarDark, setIsNavbarDark] = useState<boolean>(false);

	const handleHamburger = () => {
		setShowHamburger(!showHamburger);
	};
	const handleSettings = () => {
		setShowProfileSettings(!showProfileSettings);
	};

	useEffect(() => {
		const handleScroll = () => setIsNavbarDark(window.scrollY >= 50);
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleSingOut = () => {
		signOut(auth)
			.then(() => {
				console.log('the user signed out');
				navigate('/');
			})
			.catch(err => {
				console.log(err.message);
			});
	};

	return (
		<div
			className={`${styles.navbarMainContainer} ${
				isNavbarDark ? styles.blackNavbar : styles.transparentNavbar
			}`}
		>
			<div className={styles.Navbar}>
				<div className={styles.leftNavbar}>
					<div className={styles.hamburger} onClick={handleHamburger}>
						{' '}
						<FontAwesomeIcon icon={faBars} />{' '}
					</div>
					<div className={styles.genreBtns}>
						<Link to={'/home'}>
							<button
								onClick={() => {
									dispatch(setProgramType('movie'));
									window.scrollTo(0, 0);
								}}
								className={`${
									getProgramType === 'movie' ? styles.colorPrimary : null
								}`}
							>
								Movies
							</button>
						</Link>

						<Link to={'/home'}>
							<button
								onClick={() => {
									dispatch(setProgramType('tv'));
									window.scrollTo(0, 0);
								}}
								className={`${
									getProgramType === 'tv' ? styles.colorPrimary : null
								}`}
							>
								Series
							</button>
						</Link>
					</div>

					<div
						className={`${styles.hamburgerExpand} ${
							showHamburger ? styles.showMenu : styles.hideMenu
						}`}
					>
						<div className={styles.closeHamburger}>
							<div
								className={styles.hambIcon}
								onClick={() => {
									handleHamburger();
								}}
							>
								{' '}
								<FontAwesomeIcon icon={faXmark} />{' '}
							</div>
						</div>
						<div className={styles.hamburgerList}>
							<ul>
								<Link to={'/home'} onClick={handleHamburger}>
									<li> Home </li>
								</Link>
								<Link to={'/mylist'} onClick={handleHamburger}>
									<li> My List </li>
								</Link>
								<Link to={'/home'}>
									<li
										onClick={() => {
											dispatch(setProgramType('movie'));
											handleHamburger();
										}}
									>
										{' '}
										Movies{' '}
									</li>
								</Link>
								<Link to={'/home'}>
									<li
										onClick={() => {
											dispatch(setProgramType('tv'));
											handleHamburger();
										}}
									>
										{' '}
										TV Shows{' '}
									</li>
								</Link>
							</ul>
						</div>
					</div>
				</div>

				<div className={styles.midNavbar}>
					<Link to={'/home'}>
						{' '}
						<div className={styles.logoBox}>
							{' '}
							<p>Flicker</p>{' '}
						</div>{' '}
					</Link>
				</div>

				<div className={styles.rightNavbar}>
					<Link to={'/search'}>
						{' '}
						<div className={styles.searchBox}>
							{' '}
							<FontAwesomeIcon icon={faSearch} />{' '}
						</div>{' '}
					</Link>
					<div className={styles.profileImg} onClick={() => handleSettings()}>
						<img
							src={
								profileData?.avatar !== undefined
									? profileData.avatar
									: avatarDef
							}
							alt='profile avatar'
						/>
					</div>
					<div
						className={`${styles.profileOptions} ${
							showProfileSettings ? styles.showOptions : styles.hideOptions
						}`}
					>
						<button className={styles.option}>
							<Link to={'/profile'} className={`${styles.option}`}>
								{' '}
								Settings{' '}
							</Link>
						</button>
						<hr className={styles.optionHR} />
						<button className={styles.option} onClick={handleSingOut}>
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
