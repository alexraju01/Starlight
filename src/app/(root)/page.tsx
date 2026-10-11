import { Carousel, CustomSlider, GenreCollection } from '@/components';
import BlurBackground from '@/components/Blurs/BackgroundBlur';
import SliderBoundary from '@/components/Media/CustomSlider/SliderBoundary';
import { ENDPOINTS } from '@/constants';
import { MediaMode } from '@/types/mediaMode';

const Home = () => {
  return (
    <>
      <Carousel mediaMode={MediaMode.MOVIE} />
      <section className="relative overflow-hidden sm:mt-15">
        <BlurBackground />

        <div className="px-2 md:mx-6 lg:mx-[68px] 2xl:mx-[101px]">
          <GenreCollection />
          <SliderBoundary message="Failed to load trending movies.">
            <CustomSlider
              endpoint={ENDPOINTS.TRENDING_MOVIES}
              title="Trending Movies"
              mediaMode={MediaMode.MOVIE}
            />
          </SliderBoundary>
          <SliderBoundary message="Failed to load popular movies.">
            <CustomSlider
              endpoint={ENDPOINTS.POPULAR_MOVIES}
              title="Popular Movies"
              mediaMode={MediaMode.MOVIE}
            />
          </SliderBoundary>
          <SliderBoundary message="Failed to load trending TV shows.">
            <CustomSlider
              endpoint={ENDPOINTS.TRENDING_TV}
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
