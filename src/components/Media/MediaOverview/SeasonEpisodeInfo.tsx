interface Props {
  seasons?: number;
  episodes?: number;
}

const SeasonEpisodeInfo = ({ seasons, episodes }: Props) => {
  // Guard clause: If data is missing, don't render anything
  if (!seasons || !episodes) return null;

  const seasonText = seasons === 1 ? 'Season' : 'Seasons';

  return (
    <section className="w-full">
      <div className="flex justify-evenly text-[2rem] w-full text-white/50 mb-4">
        <div>{`${seasons} ${seasonText}`}</div>
        <div>{`${episodes} Episodes`}</div>
      </div>
    </section>
  );
};

export default SeasonEpisodeInfo;
