import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

interface MovieResultsProps {
  inputError: string | null;
  searchError: string | null;
  movies: Movie[];
  loading: boolean;
}

export function MovieResults({
  inputError,
  searchError,
  movies,
  loading,
}: MovieResultsProps) {
  if (inputError) return <p>{inputError}</p>;
  if (searchError) return <p>{searchError}</p>;
  if (loading) return <p>Loading...</p>;
  if (movies) {
    return (
      <>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </>
    );
  }
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="w-full sm:w-full bg-slate-300 rounded-xl">
      <img
        className="w-11/12 mx-auto mt-3 my-1 rounded-xl"
        src={movie.Poster}
        alt={movie.Title}
      />
      <h3 className="font-bold px-2">{movie.Title}</h3>
      <p className="mb-1">{movie.Year}</p>
    </article>
  );
}
