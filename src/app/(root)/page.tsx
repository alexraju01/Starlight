import { Carousel, Footer } from "@/components";
import { MediaMode } from "@/types/mediaMode";
import GenreCollection from "@/components/GenreCollection/GenreCollection";
import CustomSlider from "@/components/CustomSlider/CustomSlider";
import BlurBackground from "@/components/Blurs/BackgroundBlur";

const Home = () => {
	return (
		<main className='relative w-full h-full'>
			{/* Carousel Section */}
			<div className='relative'>
				<Carousel mediaMode={MediaMode.MOVIE} />
			</div>

			{/* Background Gradient Blur Effects */}
			<section className='relative h-full bg-[#100F10] w-full pt-20 overflow-hidden '>
				<BlurBackground />

				{/* Content Wrapper with Padding */}
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
