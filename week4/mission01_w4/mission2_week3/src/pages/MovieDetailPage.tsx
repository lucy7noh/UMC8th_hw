import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MovieDetail, Cast, Crew } from "../types/movieDetail";

const MovieDetailPage = (): JSX.Element => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [crew, setCrew] = useState<Crew[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&append_to_response=credits`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovie(data);
        setCast(data.credits.cast.slice(0, 6));
        setCrew(data.credits.crew.filter((c: Crew) => c.job === "Director"));
      } catch (error) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    if (movieId) fetchMovie();
  }, [movieId]);

  if (isPending) return <div className="text-center mt-10 text-xl">로딩 중입니다...</div>;
  if (isError || !movie) return <div className="text-center mt-10 text-red-500">영화 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="relative">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center blur-sm opacity-40"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      />

      
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl">
          <img
            className="w-full md:w-96 rounded-xl shadow-lg"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="flex-1">
            <h1 className="text-6xl font-bold mb-3 ">{movie.title}</h1>
            <p className="text-2xl text-gray-400 mb-4  mt-12">{movie.tagline}</p>
            <p className="text-gray-800 mb-4 leading-relaxed ">{movie.overview}</p>
            <ul className="text-1xl text-gray-600 space-y-1  mt-20">
              <li><strong>개봉일:</strong> {movie.release_date}</li>
              <li><strong>상영시간:</strong> {movie.runtime}분</li>
              <li><strong>평점:</strong> ⭐ {movie.vote_average}</li>
            </ul>
          </div>
        </div>

        {(crew.length > 0 || cast.length > 0) && (
          <div className="mt-10">
            <h1 className="text-3xl font-bold mb-4">감독 & 출연진</h1>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {crew.map((director) => (
                <div key={director.id} className="text-center text-sm">
                  <img
                    className="w-30 h-40 object-cover rounded mx-auto rounded-full border-4 border-white"
                    src={director.profile_path ? `https://image.tmdb.org/t/p/w200${director.profile_path}` : "https://via.placeholder.com/100x150?text=No+Image"}
                    alt={director.name}
                  />
                  <p className="mt-1 font-semibold">{director.name}</p>
                  <p className="text-xs text-gray-400">감독</p>
                </div>
              ))}
              {cast.map((actor) => (
                <div key={actor.id} className="text-center text-sm">
                  <img
                    className="w-30 h-40 object-cover rounded mx-auto rounded-full border-4 border-white"
                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "https://via.placeholder.com/100x150?text=No+Image"}
                    alt={actor.name}
                  />
                  <p className="mt-1">{actor.name}</p>
                  <p className="text-xs text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
