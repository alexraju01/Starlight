interface Props {
	metaData: {
		number_of_seasons: number;
		number_of_episodes: number;
	};
}

export default function SeasonEpisodeInfo({ metaData }: Props) {
	const { number_of_seasons, number_of_episodes } = metaData;
	const plural = number_of_seasons === 1 || !number_of_seasons ? "Season" : "Seasons";

	return (
		<section className='w-full'>
			{number_of_seasons && number_of_episodes && (
				<div className='flex justify-evenly text-[2rem] w-full text-white/50 mb-4'>
					<div>{`${number_of_seasons} ${plural}`}</div>
					<div>{`${number_of_episodes} Episodes`}</div>
				</div>
			)}
		</section>
	);
}
