import { useEffect, useState, useRef } from "react";
import StarRating from "./StarRating";
import {useMovies} from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  useKey("Enter", () =>{
    if (document.activeElement === inputEl.current) return;
        inputEl.current.focus();
        
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
function Main({ children }) {

  return (
    <main className="main">
      {children}
    </main>

  );
}
function WatchedMovieList({ watched, handleDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} handleDeleteWatched={handleDeleteWatched} />
      ))}
    </ul>
  );
}
function WatchedMovie({ movie, handleDeleteWatched }) {
  return (
    <li >
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete"
          onClick={() => handleDeleteWatched(movie.imdbID)}
        >X</button>
      </div>
    </li>
  );
}
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>

  );
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        children
      )}
    </div>

  );
}
function MovieList({ movies, setSelectedId }) {

  return (
    <ul className="list list-box">
      {movies?.map((movie) => (
        <Movie movie={movie} setSelectedId={setSelectedId} key={movie.imdbID} />
      ))}
    </ul>

  )
}
function Movie({ movie, setSelectedId }) {
  return (
    <li key={movie.imdbID} onClick={() => setSelectedId((id) => id === movie.imdbID ? null : movie.imdbID)} >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function Loading() {
  return (
    <div className="loader">Loading...</div>
  );
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⚡</span>{message}
    </p>
  )
}
const KEY = "d5e768fd"
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [watched, setWatched] =useLocalStorageState([],"watched")
  


  const { movies, isLoading, error } = useMovies(query);
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  // const query = "Matrix";

  
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

  }
  


  return (
    <>

      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>

      <Main  >
        {/* // we can use elemnt instead of children in Box <Box element={<MovieList movies={movies}}/> */}
        <Box >
          {isLoading && <Loading />}
          {!isLoading && !error && <MovieList movies={movies} setSelectedId={setSelectedId} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box >
          {selectedId ? (<SelctedMovie setWatched={setWatched} watched={watched} handleAddWatched={handleAddWatched} selectedId={selectedId} setSelectedId={setSelectedId} />) :
            (<>
              <WatchedSummary watched={watched} />
              <WatchedMovieList handleDeleteWatched={handleDeleteWatched} watched={watched} />
            </>
            )}

        </Box>
      </Main>
    </>
  );
}
function SelctedMovie({ selectedId, setSelectedId, handleAddWatched, watched, setWatched }) {
  const [movie, setMovie] = useState({});
  const [Loader, setLoader] = useState(false);
  const { Title: title, Year: year, Plot: plot, Poster: poster,
    Runtime: runtime, imdbRating,
    Released: released, Actors: actors, Director: director, Genre: genre
  } = movie;
  const [userRating, setUserRating] = useState(0);

  useKey("Escape", () => setSelectedId(null));
  useEffect(function () {
    async function getMovie() {
      setLoader(true);
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await res.json();
      if (watched.find((movie) => movie.imdbID === selectedId)) {
        const prevrating = watched.find((movie) => movie.imdbID === selectedId)
        setUserRating(prevrating.userRating);
        setMovie(data);
      }
      else {
        setMovie(data);
      }
      console.log(data);
      setLoader(false);
    }
    getMovie();
  }, [selectedId, watched]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`

    return function () {
      document.title = "usePopCorn";
    }


  }, [title]);

  function handleAdd() {
    if (watched.find((movie) => movie.imdbID === selectedId)) {
      setWatched(watched.map((movie) => movie.imdbID !== selectedId ? movie : { ...movie, userRating: userRating }));
      setSelectedId(null);
      return
    }
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      userRating,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
    }
    handleAddWatched(newWatchedMovie);
    setSelectedId(null);
  }

  return (
    <div className="details">
      {Loader ? (<Loading />) : (
        <>
          <header>
            <button className="btn-back" onClick={() => setSelectedId(null)}>&larr;</button>

            <img src={poster} alt="Poster" />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p><span>🌟</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <StarRating defaultRating={userRating} setrating={setUserRating} maxStar={10} size={24} />
            {userRating > 0 && <button className="btn-add" onClick={handleAdd}>Add to List</button>}
            <p><em>{plot}</em></p>
            <p>Starting {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}