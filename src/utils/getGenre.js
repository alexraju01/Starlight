import fetchData from "./fetchData";

export default async function getGenre(type) {
	return await fetchData(3, `genre/${type}/list`);
}
