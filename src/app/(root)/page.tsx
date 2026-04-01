import { Carousel, CustomSlider, GenreCollection } from '@/components';
import BlurBackground from '@/components/Blurs/BackgroundBlur';
import { MediaMode } from '@/types/mediaMode';

const Home = () => {
  return (
    <main>
      <Carousel mediaMode={MediaMode.MOVIE} />

      <section className="relative font- h-full bg-[#100F10] w-full  overflow-hidden">
        <BlurBackground />

        <div className="mx-6 lg:mx-[68px] 2xl:mx-[101px]">
          <GenreCollection />

          <CustomSlider
            endpoint="trending/movie/day"
            title="Trending Movies"
            mediaMode={MediaMode.MOVIE}
          />
          <CustomSlider
            endpoint="movie/popular"
            title="Popular Movies"
            mediaMode={MediaMode.MOVIE}
          />

          <CustomSlider
            endpoint="trending/tv/day"
            title="Trending TV Shows"
            mediaMode={MediaMode.TV}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
