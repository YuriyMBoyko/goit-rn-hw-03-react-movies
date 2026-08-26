import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import css from './App.module.css'
import type { Movie } from '../../types/movie.ts'
import SearchBar from '../SearchBar/SearchBar.tsx'
import Loader from '../Loader/Loader.tsx'
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx'
import MovieGrid from '../MovieGrid/MovieGrid.tsx'
import MovieModal from '../MovieModal/MovieModal.tsx'
import { fetchMovies } from '../../services/movieService.ts'

export default function App() {
  const [searchStr, setSearchStr] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (searchStr === '') return;

      setMovies([]);
      setIsError(false);
      setSelectedMovie(null);
      setIsLoading(true);
      try {
        const newMovies = await fetchMovies(searchStr);
        if (newMovies.length === 0) {
          toast.error('No movies found for your request.');
          return;
        }

        setMovies(newMovies);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [searchStr]);

  const handleSubmit = async (searchStr: string) => {
    setSearchStr(searchStr.trim());
  }

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  }

  const handleModalClose = () => {
    setSelectedMovie(null);
  }

  return (
    <div className={css.app}>
      <Toaster position='top-center' />
      <SearchBar onSubmit={handleSubmit}/>

      {isLoading && <Loader />}

      {!isLoading && isError && <ErrorMessage />}

      {!isLoading && !isError && (movies.length !== 0) && <MovieGrid movies={movies} onSelect={handleSelectMovie} />}

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleModalClose} />}
    </div>
  );
}