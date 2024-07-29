import Image from "next/image";
import styles from "./MovieCard.module.css";
import Link from "next/link";

export default async function MovieCard({ movie }) {
	return (
		<Link href={`/movies/${movie.id}`}>
			<div className={styles.movieCard}>
				<Image
					className={styles.img}
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					width={100}
					height={150}
					layout="responsive"
					alt={movie.title}
				/>
			</div>
		</Link>
	);
}
