import fetchData from "@/utils/fetchData";
import Image from "next/image";
import Link from "next/link";

const genres = [
  { id: 28, name: "Action" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 12, name: "Adventure" },
  { id: 18, name: "Drama" },
];

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

const GenreCollection = async () => {
  // Fetch movies for each genre in parallel
  const genreMovies = await Promise.all(
    genres.map(async (genre) => {
      const data = await fetchData(
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
      <div className="flex gap-[34px] ">
        {genreMovies.map((genre) => (
          <div
            key={genre.id}
            className="w-[315px] rounded-[13.75px] border-solid border-[#262626] border-[1.15px] bg-[#1A1A1A] px-[34px] pt-[34px] flex flex-col gap-2"
          >
            <Link href={`/genre/${genre.id}`}>
              <div className="relative grid grid-cols-2 gap-[5px]">
                <div className="absolute bottom-0 left-0 w-full h-full rounded-[9px] bg-amber-500 z-10 genre-gradient"></div>
                {genre.movies.map((movie) => (
                  <div key={movie.id} className="relative w-full h-[100px]">
                    <Image
                      src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="w-full h-full object-cover rounded-[11px]"
                    />
                    {/* <img /> */}
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
