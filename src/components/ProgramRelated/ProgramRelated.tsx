import React from 'react';
import Recomendations from '../../components/Recomendations/Recomendations';
import { ProgramRelatedProps } from '../../types/types';
import styles from './programRelated.module.scss';

const ProgramRelated: React.FC<ProgramRelatedProps> = ({
	production,
	getProgramID,
}) => (
	<div className={styles.relatedBox}>
		{production.recommendations.total_results === 0 ? (
			<p className={styles.noRecommend}>
				We don't have enough data to suggest any movies based on{' '}
				<span>{production.title}</span>
			</p>
		) : (
			<Recomendations
				title='More like this'
				data={production.recommendations.results}
				parentType={getProgramID.type}
			/>
		)}
	</div>
);

export default ProgramRelated;
