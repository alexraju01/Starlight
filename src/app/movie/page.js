// "use client";
import styles from "./page.module.css";
import MediaWrapper from "../../components/MediaHandlers/MediaWrapper";
import { Suspense } from "react";
import Spinner from "@/components/LoadingSkeletons/Spinner/Spinner";

export default async function MoviesPage() {
	return (
		<div className={styles.container} style={{ animation: "fadeIn 0.5s ease-in-out" }}>
			<h2>Movies List</h2>
			<MediaWrapper mediaMode={"movie"} />
		</div>
	);
}
