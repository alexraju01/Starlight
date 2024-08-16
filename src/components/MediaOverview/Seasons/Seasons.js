import styles from "./Seasons.module.css";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Icons from "@/utils/icons";
import { Suspense } from "react";
import SeasonsCard from "../SeasonsCard/SeasonsCard";
export default async function Seasons({ seasons }) {
	const { id } = seasons;
	const seasonsDetail = seasons.seasons;
	const plural = seasons.length === 1 || 0 ? "Season" : "Seasons";

	if (!seasonsDetail || seasonsDetail.length === 0) return null; // Return null if there are no seasons to display

	return (
		<section className={styles.container}>
			<SectionHeading icon={Icons.play}>{`${plural} (${seasonsDetail.length})`}</SectionHeading>
			<Suspense fallback={<div>Loading season. . . </div>}>
				<div className={styles.seasonContainer}>
					{seasonsDetail.map((season, index) => (
						<SeasonsCard key={index} id={id} season={season} />

						// </div>
					))}
				</div>
			</Suspense>
		</section>
	);
}
