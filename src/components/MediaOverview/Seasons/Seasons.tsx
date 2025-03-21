import { Suspense } from "react";

import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { Season } from "@/types/seasons";
import Icons from "@/utils/icons";

import styles from "./Seasons.module.css";
import SeasonsCard from "../SeasonsCard/SeasonsCard";

interface Props {
	seasons: Season[];
}

export default async function Seasons({ seasons }: Props) {
	const plural = seasons.length === 1 || 0 ? "Season" : "Seasons";

	if (!seasons || seasons.length === 0) return null; // Return null if there are no seasons to display

	return (
		<section className={styles.container}>
			<SectionHeading icon={Icons.play}>{`${plural} (${seasons.length})`}</SectionHeading>
			<Suspense fallback={<div>Loading season. . . </div>}>
				<div className={styles.seasonContainer}>
					{seasons.map((season, index) => (
						<SeasonsCard key={index} id={season.id} season={season} />

						// </div>
					))}
				</div>
			</Suspense>
		</section>
	);
}
