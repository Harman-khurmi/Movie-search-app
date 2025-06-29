import { useEffect, useState } from 'react'
import Spinner from './Spinner';
import MovieCard from './MovieCard';
import { useDebounce } from 'react-use';
import { getPopularMovies, updateSearchCount } from '../appwrite';
import { get } from 'flowbite-react/helpers/get';

const Hero = () => {

    const [searchText, setSearchText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [Loading, setLoading] = useState(false);
    const [moviesList, setMoviesList] = useState([]);
    const [debouncedSearchText, setDebouncedSearchText] = useState('');
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularError, setPopularError] = useState('');


    const base_url = import.meta.env.VITE_TMDB_BASE_URL;
    const api_key = import.meta.env.VITE_TMDB_API_KEY;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${api_key}`
        }
    };
    // Debounce the search text to avoid too many API calls
    // This will wait for 500ms after the user stops typing before making the API call
    useDebounce(() => {
        setDebouncedSearchText(searchText)
    }, 500, [searchText]);

    const fetchMovies = async (query = '') => {
        setLoading(true);
        setErrorMessage('');
        try {
            const endpoint = query ? `${base_url}/search/movie?query=${encodeURIComponent(query)}` : `${base_url}/discover/movie?sort_by=popularity.desc`
            const response = await fetch(endpoint, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            if (!data.results || data.results.length === 0) {
                setErrorMessage('No movies found. Please try a different search.');
                setMoviesList([]);
                setLoading(false);
                return [];
            }
            else {
                setErrorMessage('');
                setLoading(false);
                setMoviesList(data.results || []);
            }

            if (query && data.results && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }

        }
        catch (error) {
            console.error('Error fetching movies:', error);
            setErrorMessage('Failed to fetch movies. Please try again later.');
            return [];
        }
        finally {
            setLoading(false);
        }
    }

    // Fetch popular movies on initial load
    const fetchPopularMovies = async () => {
        setLoading(true);
        try {
            const popularMovies = await getPopularMovies();
            if (popularMovies && popularMovies.length > 0) {

                setPopularMovies(popularMovies);
            }
            else {
                setPopularError('No popular movies found.');
            }
        }
        catch (error) {
            console.error('Error fetching popular movies:', error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies(debouncedSearchText);
    }, [debouncedSearchText])

    // Fetch popular movies on initial load
    useEffect(() => {
        fetchPopularMovies();
    }, []);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        console.log(e.target.value);
    };
    return (
        <>
            <div className='flex flex-col items-center justify-center'>

                <div className='pt-40 items-center justify-center'><img src="/hero.png" alt="" className='lg:w-96 md:w-84 w-72' /></div>
                <div className='flex flex-col items-center justify-center gap-4 text-center mt-4'>
                    <h1 className='lg:text-5xl md:text-4xl text-3xl text-center font-bold'>Find <span className='bg-gradient-to-br from-teal-400 to-blue-500 
            inline-block text-transparent bg-clip-text'>Movies</span> You Love <br /> Without the Hassle</h1>
                </div>
                {/* search */}
                <div className='flex md:w-[35%] w-[80%] items-center justify-center content-center relative mt-6 bg-violet-800/20 rounded-lg'>
                    <img src="/search.svg" alt="" className='absolute left-4' />
                    <input value={searchText} onChange={handleSearchChange} type="text" name="search" id="" placeholder='Search your movies here' className='p-3 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-violet-900 focus:rounded-lg focus:border-violet-900'>
                    </input>
                </div>
                {/* popular movie section */}
                <div className='flex flex-col w-full text-left px-10'>
                    <h1 className='font-bold text-3xl mt-10 text-indigo-800'>Top Searches</h1>
                    <div>
                        {popularMovies.length > 0 ? (
                            <ul className='mt-10 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 '>
                                {popularMovies.map((movie, index) => (
                                    <li key={movie.$id} className='flex items-center'>
                                        <p className='text-[10rem] font-bold text-transparent stroke-text mr-[-1.5rem]'>{index + 1}</p>
                                        <div className='rounded-xl drop-shadow-lg drop-shadow-indigo-600/60 items-center h-54 w-36 justify-center bg-auto overflow-hidden'>
                                        <img src={movie.poster_url} alt={movie.title} className='' />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className='text-red-500'>{popularError || 'No popular movies found.'}</p>
                        )}
                    </div>
                </div>
                {/* All movies section */}
                <div className='flex flex-col items-center justify-center my-16'>
                    <div className='flex w-full text-left px-10'>
                        <h1 className='font-bold text-3xl text-indigo-800'>All Movies</h1>
                    </div>
                    {Loading ? (
                        <div className='flex items-center justify-center'>
                            <Spinner />
                        </div>
                        // <Spinner/>

                    ) : errorMessage ? (
                        <p className='text-red-500'>{errorMessage}</p>
                    ) : (
                        <ul className='mx-10 mt-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-8'>
                            {moviesList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    )
}

export default Hero
