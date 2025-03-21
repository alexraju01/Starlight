import fetchData from "./fetchData";

export default async function getGenre(type: string) {
	return await fetchData("3", `genre/${type}/list`);
}
