// import ImageWithFallback from "@/app/components/BrokenImage/ImageWithFallback";
import ImageWithFallback from "../BrokenImage/ImageWithFallback";
import styles from "./CastContainer.module.css";
import SectionHeading from "../SectionHeading/SectionHeading";
import Icons from "../../utils/icons";

export default async function CastContainer({ castList }) {
	if (!castList) return null;
	return (
		<div className={styles.container}>
			<SectionHeading icon={Icons.play}>Cast</SectionHeading>

			<div className={styles.castListContainer}>
				{castList.map((cast, index) => (
					<div key={index} className={styles.castListItem}>
						<div className={styles.castImgContainer}>
							<ImageWithFallback
								src={
									cast.profile_path
										? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
										: `https://image.tmdb.org/t/p/w185/${cast.profile_path}`
								}
								alt={cast.name}
							/>
						</div>
						<div className={styles.content}>
							<p className={styles.name}>{cast.name}</p>
							<p className={styles.character}>{cast.character}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
