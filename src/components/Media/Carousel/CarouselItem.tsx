import Image from "next/image";
import { MoviesWithLogos } from "@/types/global";
import MediaMeta from "./MediaMeta";
import ActionButtons from "./ActionButton";
import { getImageUrl } from "@/utils/image/getImageUrl";
import useWindowWidth from "@/hooks/useWindowWidth";

interface Props {
	movie: MoviesWithLogos;
	genres: Record<number, string>;
	isActive: boolean;
	// isMobile: boolean;
}

export default function CarouselItem({ movie, genres, isActive }: Props) {
	return (
		<li className=' flex-shrink-0 flex w-full h-full sm:h-[80%] md:h-full items-center justify-evenly flex-row relative'>
			<Image
				src={getImageUrl(movie.backdrop_path, "backdrop", "original")}
				fill
				quality={75}
				alt={movie.title || movie.name || "Media"}
				className='object-cover object-center brightness-[80%]'
				priority={isActive}
				style={{
					maskImage:
						"linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.8) 100%)",
					WebkitMaskImage:
						"linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.8) 100%)",
				}}
			/>

			<div className='absolute space-y-4 z-10 max-w-screen lg:w-[854px] bottom-0 sm:pb-0 md:pb-0 left-[25px] right-[25px] lg:left-[102px]'>
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
				<p className='hidden sm:block text-[clamp(1.6rem,2vw,2rem)] max-w-screen mb-9 leading-[175%] text-white'>
					{movie.overview}
				</p>

				<ActionButtons />
			</div>
		</li>
	);
}
