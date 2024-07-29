import fetchData from "./fetchData";

export default async function getMoviesLogo({}) {
	return await fetchData(3, `movie/${moviei.id}/images`);
}
