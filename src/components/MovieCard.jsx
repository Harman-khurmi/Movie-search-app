import React from 'react'

const MovieCard = ({ movie }) => {
    return (
        <>
<div className='flex flex-col p-5  shadow-inner shadow-indigo-400/30 rounded-2xl'>
<div className='rounded-xl  items-center h-90 justify-center bg-cover overflow-hidden'>
    <img className='bg-cover' src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "/no-movie.png"} alt="poster image" />
</div>
    <div>
        <h1 className='text-lg font-semibold mt-2'>{movie.title}</h1>
        <div className='flex items-center gap-1.5 text-gray-500'>
        <img src={`star.svg`} alt="" />
        <p className='text-sm text-gray-100 font-semibold'>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
        <p>•</p>
        <p className='text-sm text-gray-500'>{movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'}</p>
        <p>•</p>
        <p className='text-sm text-gray-500 capitalize'>{movie.original_language ? movie.original_language : 'Unknown'}</p>


        </div>
        <p className='text-sm text-gray-600 mt-1'>{movie.overview ? movie.overview.slice(0, 100) + '...' : 'No overview available'}</p>
    </div>
</div>
        </>
    )
}

export default MovieCard
