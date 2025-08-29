import Link from "next/link";
import { Suspense } from "react";
import { FaQuestionCircle } from "react-icons/fa";

import GenreSkeleton from "@/components/Feedback/LoadingSkeletons/GenreSkeleton";
import { Genre } from "@/types/genre";
import fetchData from "@/utils/fetchData";
import Icons, { GenreKey } from "@/utils/icons";

// Server Component
async function FetchGenres() {
	const [{ genres: movieGenres }, { genres: tvGenres }] = await Promise.all([
		fetchData<{ genres: Genre[] }>("3", "genre/movie/list"),
		fetchData<{ genres: Genre[] }>("3", "genre/tv/list"),
	]);

	const combinedGenres = [...movieGenres, ...tvGenres];
	const uniqueGenres = Array.from(
		new Map(combinedGenres.map((genre) => [genre.id, genre])).values()
	).sort((a, b) => a.name.localeCompare(b.name));

	return (
		<div className='relative grid w-full mt-10 md:mt-0  gap-6 p-6 sm:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] xl:p-16'>
			{uniqueGenres.map(({ id, name }) => {
				const icon = Icons.genreIcons[name as GenreKey] ?? <FaQuestionCircle />;
				return (
					<Link key={id} href={`/genre/${id}`}>
						<div className='flex flex-col items-center justify-center gap-4 rounded-xl bg-[#11223b] p-4 text-center text-lg  outline-white/20 transition-transform duration-300 ease-in-out hover:scale-110 h-36 sm:h-40 md:h-44 xl:h-48'>
							<i className='text-4xl'>{icon}</i>
							<p>{name}</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
}

export default function GenrePage() {
	return (
		<section className='flex h-full w-full flex-col items-center justify-center mt-20'>
			<h2 className='mb-20 text-center text-2xl font-semibold'>List of all genres</h2>
			<Suspense fallback={<GenreSkeleton />}>
				<FetchGenres />
			</Suspense>
		</section>
	);
}
