**Movie Search App**
Things used in the project:
1. VITE + REACT + TAILWINDCSS
2. Used TMDB API to GET the movies data
3. Flowbite for loader animation
4. Used Debounce to minimise the API request load
5. npm 0 react-use - to get pre-defined Debounce hook for react
6. Used Appwrite to create backend and store data for popular movies (searchTerm, movie_id, poster_url, count)
7. Made a small algorithm to show the most searched movies (1st element of most searched) in the Popular movies by fetching the count of the search movies from database (Appwrite)