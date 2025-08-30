import { Carousel, CustomSlider, Footer, GenreCollection } from '@/components';
import BlurBackground from '@/components/Blurs/BackgroundBlur';
import { MediaMode } from '@/types/mediaMode';

const Home = () => {
  return (
    <main className="relative ">
      {/* Carousel Section */}
      <section className="relative mt-[158px] md:mt-0">
        <Carousel mediaMode={MediaMode.MOVIE} />
      </section>

      <section className="relative h-full bg-[#100F10] w-full pt-20 overflow-hidden">
        <BlurBackground />

        <div className="mx-6 lg:mx-[68px] 2xl:mx-[101px]">
          <GenreCollection />

          <CustomSlider
            endpoint="trending/movie/day"
            title="Top 20 Movies"
            mediaMode={MediaMode.MOVIE}
          />
          {/* Checking changes on ci */}
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

        <Footer />
      </section>
    </main>
  );
};

export default Home;
