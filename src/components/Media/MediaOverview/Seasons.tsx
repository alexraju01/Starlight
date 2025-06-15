import { Suspense } from "react";

import SectionHeading from "@/components/Navigation/SectionHeading";
import { Season } from "@/types/seasons";
import Icons from "@/utils/icons";
import SeasonsCard from "./SeasonsCard";

interface Props {
	seasons: Season[];
}

export default async function Seasons({ seasons }: Props) {
	const plural = seasons.length === 1 || 0 ? "Season" : "Seasons";

	if (!seasons || seasons.length === 0) return null;

	return (
		<section className='flex flex-col gap-4 px-12 w-full'>
			<SectionHeading icon={Icons.play}>{`${plural} (${seasons.length})`}</SectionHeading>

			<Suspense fallback={<div>Loading season. . . </div>}>
				<div
					className='
						grid w-full gap-[1.2rem]
						[grid-template-columns:repeat(auto-fill,minmax(13rem,1fr))]
						@xl:[grid-template-columns:repeat(auto-fill,minmax(17rem,1fr))]
						xl:gap-[1.5rem]
					'>
					{seasons.map((season, index) => (
						<SeasonsCard key={index} id={season.id} season={season} />
					))}
				</div>
			</Suspense>
		</section>
	);
}
