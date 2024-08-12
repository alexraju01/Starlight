import Image from "next/image";
import styles from "./Seasons.module.css";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Icons from "@/utils/icons";
export default function Seasons({ seasons }) {
	return (
		<section className={styles.container}>
			<SectionHeading icon={Icons.play}>Seasons</SectionHeading>
			<div className={styles.seasonContainer}>
				{seasons.map(({ id, poster_path, name }) => (
					<div key={id} className={styles.season}>
						<div className={styles.seasonPoster}>
							{/* <MediaCard media={{ id, poster_path }} /> */}
							<Image src={`https://image.tmdb.org/t/p/w342${poster_path}`} fill alt={name} />
						</div>
						<p>{name}</p>
					</div>
				))}
			</div>
		</section>
	);
}
