import { Carousel } from "@/components";
import { MediaMode } from "@/types/mediaMode";
import GenreCollection from "@/components/GenreCollection/GenreCollection";
import CustomSlider from "@/components/CustomSlider/CustomSlider";

export default function Home() {
	return (
		<main className='relative w-full h-full'>
			<div className='relative'>
				<Carousel mediaMode={MediaMode.MOVIE} />
			</div>
			<section className='relative h-full bg-[#100F10] w-full pt-20 overflow-hidden '>
				<div className='absolute z-0 size-[400px] left-[-334px] top-[334px] md:bg-[#9E221A70] blur-[225px]'></div>
				<div className='absolute z-0 size-[400px] right-[-334px] top-1/2 md:bg-[#9E221A70] blur-[255px]'></div>

				<div className='mx-6 lg:mx-[68px] 2xl:mx-[101px]'>
					<GenreCollection />
					<CustomSlider
						endpoint='trending/movie/day'
						title='Top 20 Movies'
						mediaMode={MediaMode.MOVIE}
					/>
					<CustomSlider
						endpoint='movie/popular'
						title='Popular Movies'
						mediaMode={MediaMode.MOVIE}
					/>

					<CustomSlider
						endpoint='trending/tv/day'
						title='Trending TV Shows'
						mediaMode={MediaMode.TV}
					/>
				</div>
				<footer>Footer</footer>
			</section>
		</main>
	);
}
