import { MultiMedia } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";

import styles from "./SimilarMedia.module.css";
import fetchData from "../../../utils/fetchData";
import Icons from "../../../utils/icons";
import SectionHeading from "../../SectionHeading/SectionHeading";
import Slider from "../../Slider/Slider";

interface Props {
	mediaMode: MediaMode;
	params: string;
}

interface APIResponse {
	page: number;
	results: MultiMedia[];
	total_pages: number;
	total_results: number;
}

export default async function SimilarMedia({ mediaMode, params }: Props) {
	const similarMedia = await fetchData<APIResponse>("3", `${mediaMode}/${params}/similar`);
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
