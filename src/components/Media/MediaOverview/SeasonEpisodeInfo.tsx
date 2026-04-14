interface Props {
  seasons?: number;
  episodes?: number;
}

const SeasonEpisodeInfo = ({ seasons, episodes }: Props) => {
  if (!seasons || !episodes) return null;

  const seasonText = seasons === 1 ? 'Season' : 'Seasons';

  return (
    <section className="w-full">
      <div className="mb-4 flex w-full justify-evenly text-[2rem] text-white/50">
        <div>{`${seasons} ${seasonText}`}</div>
        <div>{`${episodes} Episodes`}</div>
      </div>
    </section>
  );
};

export default SeasonEpisodeInfo;
