import { useRef, useState, useMemo, useCallback } from "react";
import { Movie } from "../types/movie";
import { getMovies } from "../actions/getMovies";

export function useMovies(search: string, sorted: boolean) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string|null>(null);
  const previousSearch = useRef(search);

  const searchMovies = useCallback(async function (search: string) {
    if (search === previousSearch.current) return;
    try {
      previousSearch.current = search;
      setSearchError(null);
      setIsLoading(true);
      const newMovies = await getMovies(search);
      setMovies(newMovies);
    } catch(err) {
      console.log(err);
      setSearchError("Search error!");
    }
    finally {
      setIsLoading(false);
    }
  }, [])
  const sortedMovies = useMemo(() => {
    return sorted
    ? [...movies].sort((a,b) => a.Title.localeCompare(b.Title))
    : movies;
  }, [movies, sorted])

  return {movies: sortedMovies, searchMovies, isLoading, searchError};
}