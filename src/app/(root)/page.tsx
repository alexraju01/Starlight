import { Carousel, CustomSlider, Footer, GenreCollection } from "@/components";
import BlurBackground from "@/components/Blurs/BackgroundBlur";
import { MediaMode } from "@/types/mediaMode";

const Home = () => {
	return (
		<main className='relative w-full h-full'>
			{/* Carousel Section */}
			<section className='relative'>
				<Carousel mediaMode={MediaMode.MOVIE} />
			</section>

			<section className='relative h-full bg-[#100F10] w-full pt-20 overflow-hidden'>
				<BlurBackground />

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

				<Footer />
			</section>
		</main>
	);
};

export default Home;
