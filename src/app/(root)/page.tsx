import { Carousel } from "@/components";
import { MediaMode } from "@/types/mediaMode";
import GenreCollection from "@/components/GenreCollection/GenreCollection";
import CustomSlider from "@/components/CustomSlider/CustomSlider";

export default function Home() {
	const mediaMode: MediaMode = MediaMode.Movie;

	return (
		<main className='w-full h-full'>
			<Carousel mediaMode={mediaMode} />
			<section className='relative h-full bg-[#100F10] w-full pt-20 overflow-hidden'>
				<div className='absolute z-1 w-[407px] h-[407px] left-[-334px] top-[-54px] bg-[#9E221A70] blur-[255px]'></div>
				<div className='absolute z-1 w-[407px] h-[407px] right-[-334px] top-1/2 bg-[#9E221A70] blur-[255px]'></div>

				<div className='mx-[24px] lg:mx-[68px] 2xl:mx-[101px]'>
					<GenreCollection />
					<CustomSlider endpoint='trending/movie/day' title='Top 20 Movies' />
					<CustomSlider endpoint='movie/popular' title='Popular Movies' />
				</div>
				<footer>Footer</footer>
			</section>
		</main>
	);
}
