import { Carousel } from "@/components";
import { MediaMode } from "@/types/mediaMode";
import GenreCollection from "@/components/GenreCollection/GenreCollection";
import CustomSlider from "@/components/CustomSlider/CustomSlider";

export default function Home() {
	return (
		<main className='relative w-full h-full'>
			<div className='relative'>
				<Carousel mediaMode={MediaMode.MOVIE} />

				{/* Fade transition from Carousel to section */}
				<div className='hidden sm:block absolute bottom-0 left-0 w-full h-25 bg-gradient-to-b from-transparent to-[#100F10] pointer-events-none z-10' />
			</div>
			<section className='relative h-full bg-[#100F10] w-full pt-20 overflow-hidden '>
				{/* <div className='absolute top-0 left-0 w-full h-34 bg-gradient-to-b from-[#100F10] to-transparent pointer-events-none z-10'></div> */}
				{/* <div className='absolute bottom-40 left-0 w-full h-64 bg-gradient-to-t from-[#100F10] to-pink-200 blur-xl z-10 pointer-events-none'></div> */}
				{/* <div className='absolute z-[10000000] top-[-10px] left-0 w-full h-24 bg-gradient-to-t blur-md bg-pink-200  pointer-events-none' /> */}

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
