import { Carousel, CustomSlider, GenreCollection } from '@/components';
import BlurBackground from '@/components/Blurs/BackgroundBlur';
import SliderBoundary from '@/components/Media/CustomSlider/SliderBoundary';
import { ENDPOINTS } from '@/constants';
import { MediaMode } from '@/types/mediaMode';

const Home = () => {
  return (
    <>
      <Carousel mediaMode={MediaMode.MOVIE} />
      <section className="relative overflow-hidden">
        <BlurBackground />

        <div className="page-gutter relative flex flex-col gap-[40px] pt-[32px] pb-[48px] lg:gap-[56px] lg:pt-[48px] lg:pb-[72px]">
          <GenreCollection />
          <SliderBoundary message="Failed to load trending movies.">
            <CustomSlider
              endpoint={ENDPOINTS.TRENDING_MOVIES}
              title="Trending Movies"
              href="/movie"
              mediaMode={MediaMode.MOVIE}
            />
          </SliderBoundary>
          <SliderBoundary message="Failed to load popular movies.">
            <CustomSlider
              endpoint={ENDPOINTS.POPULAR_MOVIES}
              title="Popular Movies"
              href="/movie"
              mediaMode={MediaMode.MOVIE}
            />
          </SliderBoundary>
          <SliderBoundary message="Failed to load trending TV shows.">
            <CustomSlider
              endpoint={ENDPOINTS.TRENDING_TV}
              title="Trending TV Shows"
              href="/tv"
              mediaMode={MediaMode.TV}
            />
          </SliderBoundary>
        </div>
      </section>
    </>
  );
};

export default Home;
