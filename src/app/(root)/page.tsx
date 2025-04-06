import { Carousel } from "@/components";
import { MediaMode } from "@/types/mediaMode";
import GenreCollection from "@/components/GenreCollection/GenreCollection";
import CustomSlider from "@/components/CustomSlider/CustomSlider";

export default async function Home() {
  const mediaMode: MediaMode = MediaMode.Movie;

  return (
    <main className="w-full h-full">
      <Carousel mediaMode={mediaMode} />

      <section className="relative h-full bg-[#100F10] w-full pt-20 overflow-hidden">
        <div className="absolute z-1 w-[407px] h-[407px] left-[-334px] top-[-54px] bg-[#9E221A70] blur-[255px]"></div>
        <div className="absolute z-1 w-[407px] h-[407px] right-[-334px] top-1/2 bg-[#9E221A70] blur-[255px]"></div>

        <GenreCollection />

        <CustomSlider endpoint="trending/movie/day" />
        <div>Populaur Movies</div>
        <div>trending Show now</div>
        <footer>Footer</footer>
      </section>

      {/* <Suspense fallback={<Spinner />}>
				<div className=' hidden lg:flex w-full flex-wrap items-center justify-between py-7'>
					<div className='ml-21 w-full'>
						<SearchBox />
					</div>
				</div>

				<div className='relative w-full mb-8 rounded-xl lg:px-16'>
					<Carousel mediaMode={mediaMode} />
				</div>

				<div className='w-full mb-4 px-16'>
					<h2 className='ml-3 text-xl font-semibold'>Top 20 Rated</h2>
					<Slider mediaMode={mediaMode} endpoint={`${mediaMode}/top_rated`} />
				</div>

				<div className='w-full mb-4 px-16 '>
					<h2 className='ml-3 text-xl font-semibold'>Popular</h2>
					<Slider mediaMode={mediaMode} endpoint={`${mediaMode}/popular`} />
				</div>
			</Suspense> */}
    </main>
  );
}
