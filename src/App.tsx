import "./App.css";
import { MovieResults } from "./components/MovieResults";
import { useSearch } from "./hooks/useSearch";
import { useMovies } from "./hooks/useMovies";
import { useCallback, useState } from "react";
import debounce from "just-debounce-it";

export default function App() {
  const { search, updateSearch, inputError } = useSearch();
  const [sorted, setSorted] = useState(false);
  const { movies, searchMovies, isLoading, searchError } = useMovies(
    search,
    sorted
  );

  const debouncedMovies = useCallback(
    debounce((search: string) => searchMovies(search), 800),
    [searchMovies]
  );

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    searchMovies(search);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedMovies(newSearch);
  }

  return (
    <>
      <header className="bg-slate-400  p-4 mb-4 rounded-xl">
        <h1 className="mb-4">Movie Search</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="mx-4"
            type="text"
            value={search}
            onChange={handleInputChange}
          />
          <button>Search</button>
          <span className="ml-4 mr-1">Sort A-Z</span>
          <input
            type="checkbox"
            name="sort"
            id=""
            onChange={() => setSorted(!sorted)}
            checked={sorted}
          />
        </form>
      </header>
      <main className="w-full grid grid-cols-1 items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        <MovieResults
          inputError={inputError}
          movies={movies}
          loading={isLoading}
          searchError={searchError}
        />
      </main>
    </>
  );
}
