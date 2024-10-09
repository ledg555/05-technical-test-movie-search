import { BASE_URL, apikey } from "../api";
import { Movie } from "../types/movie";

export async function getMovies(search: string): Promise<Movie[]> {
  if (!search) return [];
  const query = new URL(BASE_URL);
  const params = new URLSearchParams();
  params.append("apikey", apikey);
  params.append("s", search);
  query.search = params.toString();
    const res = await fetch(query.href);
    const results = await res.json();
    const movies = results.Search;
    return movies;
}
