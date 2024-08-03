import Icons from "@/utils/icons";
import SectionHeading from "../SectionHeading/SectionHeading";
import styles from "./SimilarMedia.module.css";
import fetchData from "@/utils/fetchData";
import Slider from "../Slider/Slider";
export default async function SimilarMedia({ mediaMode, params }) {
	const similarMedia = await fetchData(3, `${mediaMode}/${params.slug}/similar`);
	// console.log(similarMedia);
	const textChanger = mediaMode === "tv" ? "TV Shows" : "Movies";
	// console.log(mediaMode === "tv");
	return (
		<section className={styles.container}>
			<SectionHeading icon={Icons.play}>{`Similar ${textChanger}`}</SectionHeading>
			<Slider type={`${mediaMode}/${params.slug}/similar`} />
			{/* <div></div> */}
		</section>
	);
}
