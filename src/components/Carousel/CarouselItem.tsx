import Image from "next/image";
import { MoviesWithLogos } from "@/types/global";
import MediaMeta from "./MediaMeta";
import ActionButtons from "./ActionButton";
import { getImageUrl } from "@/utils/image/getImageUrl";

interface Props {
	movie: MoviesWithLogos;
	genres: Record<number, string>;
	isActive: boolean;
}

export default function CarouselItem({ movie, genres, isActive }: Props) {
	return (
		<li className='flex-shrink-0 flex w-full h-full items-center justify-evenly flex-row relative'>
			{/* dark backdrop  */}
			<div className='custom-bg-gradient absolute bottom-0 w-full h-full z-10'></div>

			<Image
				// src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}

				src={getImageUrl(movie.backdrop_path, "backdrop", "original")}
				fill
				quality={100}
				alt={movie.title || movie.name || "Media"}
				className='object-cover object-center brightness-[80%]'
				priority={isActive}
			/>

			<div className='absolute z-20 max-w-screen lg:w-[854px] bottom-0 left-[25px] right-[25px] lg:left-[102px]'>
				{movie.logoImage ? (
					<div className='relative h-[clamp(1rem,14vw,13rem)] w-[clamp(19rem,17vw,33rem)] mb-5'>
						<Image
							src={movie.logoImage}
							fill
							quality={60}
							alt={`${movie.title || movie.name} logo`}
							className='object-contain object-center'
						/>
					</div>
				) : (
					<p className='text-[90px] font-bold'>{movie.title}</p>
				)}

				<MediaMeta movie={movie} genres={genres} />
				<p className='text-[clamp(1.6rem,2vw,2rem)] max-w-screen mb-9 leading-[175%] text-white'>
					{movie.overview}
				</p>
				<ActionButtons />
			</div>
		</li>
	);
}
