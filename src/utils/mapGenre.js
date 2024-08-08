// utils/mapGenres.js
export default function mapGenres(genresArray) {
	return genresArray.reduce((acc, genre) => {
		acc[genre.id] = genre.name;
		return acc;
	}, {});
}
