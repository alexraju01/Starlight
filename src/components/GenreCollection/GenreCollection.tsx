import { APIResponse } from "@/types/global";
import fetchData from "@/utils/fetchData";
import Image from "next/image";
import Link from "next/link";

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

const GenreCollection = async () => {
  // Fetch movies for each genre in parallel
  const genreMovies = await Promise.all(
    genres.map(async (genre) => {
      const data = await fetchData<APIResponse>(
        "3",
        `discover/movie?with_genres=${genre.id}&sort_by=popularity.desc`
      );
      return {
        ...genre,
        movies: data.results.slice(0, 4), // Only top 4 movies
      };
    })
  );

  return (
    <section className="relative z-2 flex flex-col gap-[57px] mb-[79.69px] lg:mx-[101px]">
      <div className="flex justify-between">
        <h2 className="text-[44px] font-medium font-Helvetica">Our Genres</h2>
        <div className="flex gap-[18px]">
          <button>Prev</button>
          <button>Next</button>
        </div>
      </div>
      <div className="flex gap-[34px]  overflow-hidden">
        {genreMovies.map((genre) => (
          <div
            key={genre.id}
            className="xl:w-[234.96px] 3xl:w-[315px] flex-shrink-0 rounded-[13.75px] border-solid border-[#262626] border-[1.15px] bg-[#1A1A1A] px-[34px] pt-[34px] flex flex-col gap-2"
          >
            <Link href={`/genre/${genre.id}`}>
              <div className="relative grid grid-cols-2 gap-[5px]">
                <div className="absolute bottom-0 left-0 w-full h-full rounded-[9px] bg-amber-500 z-10 genre-gradient"></div>
                {genre.movies.map((movie) => (
                  <div key={movie.id} className="relative w-full  h-[100px]">
                    <Image
                      src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                      alt={movie.title || "Movie poster"}
                      fill
                      className="object-cover rounded-[11px]"
                    />
                  </div>
                ))}
              </div>

              <h3 className="flex mb-[18px] h-[30px] justify-between items-center font-Helvetica text-white w-full text-[18px] font-medium ">
                {genre.name}
                <span>
                  <svg
                    width="21"
                    height="19"
                    viewBox="0 0 25 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.56702 11.7297L23.0582 11.7297M23.0582 11.7297L13.3872 2.05872M23.0582 11.7297L13.3872 21.4008"
                      stroke="white"
                      strokeWidth="2.29239"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenreCollection;
