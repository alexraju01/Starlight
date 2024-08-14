import MediaWrapper from "@/components/MediaHandlers/MediaWrapper";
import styles from "./page.module.css";

export default async function Tv() {
	return (
		<div className={styles.container}>
			<h2>TV Shows List</h2>
			<MediaWrapper mediaMode={"tv"} />
		</div>
	);
}
