import Icons from "../../../utils/icons";
import SectionHeading from "../../SectionHeading/SectionHeading";
import styles from "./SimilarMedia.module.css";
import fetchData from "../../../utils/fetchData";
import Slider from "../../Slider/Slider";
interface Props {
	mediaMode: "movie" | "tv";
	params: string;
}

export default async function SimilarMedia({ mediaMode, params }: Props) {
	const similarMedia = await fetchData("3", `${mediaMode}/${params}/similar`);
	const textChanger = mediaMode === "tv" ? "TV Shows" : "Movies";

	return (
		<>
			{similarMedia.results && similarMedia.results.length > 0 && (
				<section className={styles.container}>
					<SectionHeading icon={Icons.play}>{`Similar ${textChanger}`}</SectionHeading>
					<Slider mediaMode={mediaMode} endpoint={`${mediaMode}/${params}/similar`} />
				</section>
			)}
		</>
	);
}
