import { CastMember } from "@/types/cast";
import Icons from "../../utils/icons";
import ImageWithFallback from "../BrokenImage/ImageWithFallback";
import SectionHeading from "../SectionHeading/SectionHeading";

interface Props {
	castList: CastMember[];
}

export default async function CastContainer({ castList }: Props) {
	if (!castList) return null;

	return (
		<div className='w-full px-12 text-[1.8rem]'>
			<SectionHeading icon={Icons.play}>Cast</SectionHeading>

			<div className='grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] justify-center items-start text-[1.3rem]'>
				{castList.map((cast, index) => (
					<div
						key={index}
						className='w-[13rem] xl:w-[17rem] p-3 flex flex-col items-center justify-center text-center hover:bg-white/10 rounded-lg transition-all duration-300 ease-in-out'>
						<div className='relative w-[clamp(7rem,8vw,10rem)] h-[clamp(7rem,8vw,10rem)] mb-4'>
							<ImageWithFallback
								src={
									cast.profile_path
										? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
										: `https://image.tmdb.org/t/p/w185/${cast.profile_path}`
								}
								alt={cast.name}
								className='rounded-full transition-transform duration-300 ease-in-out hover:scale-110'
							/>
						</div>
						<div className='text-white transition-all duration-300 ease-in-out'>
							<p className='font-medium'>{cast.name}</p>
							<p className='text-white/50'>{cast.character}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
