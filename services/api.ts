export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${query}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response: any = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movies", response.status);
  }

  const data = await response.json();

  return data.results;
};

export const fetchMovieDetails = async (movieId: string) => {
  try {
    const response: any = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie details", response.status);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWY2OTQ0YThkMmJiNmY0NjI4OTMzOGMwZDQ3ZTliNSIsIm5iZiI6MTc1MTk5MzUxMS45LCJzdWIiOiI2ODZkNGNhN2FmNmI1Mjg1MDhlZDYwMmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.puFSRqB458HtHnH5kniN-kOIhSwFQQZOcTmli8Ii0E0'
//     }
// };
//
// fetch(url, options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.error(err));
