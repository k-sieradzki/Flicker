import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { shuffle, shufflemini } from '../../assets/images/images';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
import useFetchRandomMovie from '../../utils/Hooks/useFetchRandomMovie';
import { RootState } from '../../services/redux/store';
import styles from './shuffle.module.scss';

interface ShuffleProps {
	program: string | undefined;
}

const Shuffle: React.FC<ShuffleProps> = ({ program }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [shuffleWhat, setShuffleWhat] = useState<string>();
	const getProgramType = useSelector(
		(state: RootState) => state.app.programType
	);

	useEffect(() => {
		setShuffleWhat(program === 'movie' ? 'Movie' : 'TV Series');

		return () => {
			setShuffleWhat('');
		};
	}, [program]);

	const getRandomMovie = useFetchRandomMovie(
		getProgramType,
		navigate,
		dispatch
	);

	return (
		<div className={styles.shuffleMainContainer}>
			<div className={styles.imgBox}>
				<img
					className={styles.shuffleMini}
					src={shufflemini}
					alt='shuffle mobile'
				/>
				<img className={styles.shuffle} src={shuffle} alt='shuffle desktop' />
			</div>

			<div className={styles.textBox}>
				<h2>Mystery {shuffleWhat}</h2>
				<p>Spin the wheel of fortune and try your luck.</p>
				<PrimaryBtn name={'SHUFFLE'} onClick={getRandomMovie} />
			</div>
		</div>
	);
};

export default Shuffle;
