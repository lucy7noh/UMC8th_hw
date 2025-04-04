import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from '../types/movie';
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadinSpinner";
import { useParams } from "react-router-dom";

export default function MoviePage(): Element {
  const [movies, setMovies] = useState<Movie[]>([]);

  //1.로딩 상태
  const [isPending, setIsPending] = useState(false);
  //2.에러 상태
  const[isError, setIsError] = useState(false);
  //3. 페이지 처리
  const [page, setPage] = useState(1);

  const {category} = useParams<{
    category: string;
  }> ();

  useEffect((): void => {
    const fetchMovies = async (): Promise<void> => {
        setIsPending(true);

        try {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,

        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );
          setMovies(data.results);
          setIsPending(true);

        } catch {
            setIsError(true);
        }finally {
            setIsPending(false);

        }
    };
    fetchMovies();
  }, [page, category]);


 if(isError) {
    return (
    <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
    </div>
    );
 }


  return (
    <>
    <div className="flex item-center justify-center gap-6 mt-5">
        <button className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
        hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
        cursor-pointer disabled:cursor-not-allowed'
        disabled={page == 1} //page가 1일때 동작하지 않음(0페이지는 존재하지 않으므로)
         onClick={(): void => setPage((prev) : number => prev - 1)}>
            {'<'}</button>
                <span className="font-bold items-center justify-center">{page} 페이지</span>
                <button className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
        hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer'
                onClick={(): void => setPage((prev) : number => prev + 1)}>
                    {'>'}
                </button>
            </div>

            {isPending && (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner />
                </div>
            )}

{!isPending && (
    <div className='p-10 grid gap-2 grid-cols-2 sm:grid-cols-3 md: grid-cols-4 lg: grid-cols-5 xl:grid-cols-6'>
      {movies.map((movie) => (
      <MovieCard key ={movie.id} movie = {movie} />
      ))}
    </div>
            )}

    </>
  );
}
