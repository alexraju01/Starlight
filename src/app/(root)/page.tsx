import { Carousel, CustomSlider, GenreCollection } from '@/components';
import BlurBackground from '@/components/Blurs/BackgroundBlur';
import SliderBoundary from '@/components/Media/CustomSlider/SliderBoundary';
import { MediaMode } from '@/types/mediaMode';

const Home = () => {
  return (
    <>
      <Carousel mediaMode={MediaMode.MOVIE} />

      <section className="relative sm:mt-15  overflow-hidden">
        <BlurBackground />

        <div className="md:mx-6 lg:mx-[68px] 2xl:mx-[101px] px-2">
          <GenreCollection />
          <SliderBoundary message="Failed to load trending movies.">
            <CustomSlider
              endpoint="trending/movie/day"
              title="Trending Movies"
              mediaMode={MediaMode.MOVIE}
            />
          </SliderBoundary>
          <SliderBoundary message="Failed to load popular movies.">
            <CustomSlider
              endpoint="movie/popular"
              title="Popular Movies"
              mediaMode={MediaMode.MOVIE}
            />
          </SliderBoundary>
          <SliderBoundary message="Failed to load trending TV shows.">
            <CustomSlider
              endpoint="trending/tv/day"
              title="Trending TV Shows"
              mediaMode={MediaMode.TV}
            />
          </SliderBoundary>
        </div>
      </section>
    </>
  );
};

export default Home;
