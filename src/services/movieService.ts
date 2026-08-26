import axios from 'axios'
import type { Movie } from '../types/movie.ts'

interface MoviesResponse {
  results: Movie[];
}

export async function fetchMovies(searchStr: string): Promise<Movie[]> {
  const response = await axios.get<MoviesResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query: searchStr,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
  );

  return response.data.results;
}
