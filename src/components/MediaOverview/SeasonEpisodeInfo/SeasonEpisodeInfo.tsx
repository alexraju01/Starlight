import styles from "./SeasonEpisodeInfo.module.css";

interface Props {
	metaData: {
		number_of_seasons: number;
		number_of_episodes: number;
	};
}

export default function SeasonEpisodeInfo({ metaData }: Props) {
	const { number_of_seasons, number_of_episodes } = metaData;
	const plural = number_of_seasons === 1 || 0 || null ? "Season" : "Seasons";
	return (
		<section className={styles.container}>
			{number_of_seasons && number_of_episodes && (
				<div className={styles.mediaMetadata}>
					<div>{`${number_of_seasons} ${plural}`}</div>
					<div>{`${number_of_episodes} Episodes`}</div>
				</div>
			)}
		</section>
	);
}
