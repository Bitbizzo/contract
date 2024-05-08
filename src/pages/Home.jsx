import Categories from '../components/Categories';
import { axiosInstance, imageBaseUrl } from '../utils/api';
import { useQuery } from '@tanstack/react-query';

const fetchPopularMovies = async () => {
  const response = await axiosInstance.get('/movie/popular', {
    params: {
      language: 'en-US',
      page: 1,
    },
  });
  return response.data; // Return the data from the response
};

const Home = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: fetchPopularMovies,
  });
  // console.log(data);

  let randomMovie;
  if (data && data.results && data.results.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    randomMovie = data.results[randomIndex];
  }

  // console.log('Randomly selected movie:', randomMovie);
  return (
    <section className='container mx-auto'>
      <div className=' w-full h-[520px] bg-blue-500 relative'>
        {randomMovie && (
          <div
            style={{
              backgroundImage: `url(${imageBaseUrl}${randomMovie.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
            }}
            className='flex flex-col justify-end px-8 py-16'>
            <div className='absolute h-full inset-0 bg-gradient-to-r from-black to-transparent opacity-45'></div>
            <div className='text-white z-20 '>
              <h1 className='font-bold text-3xl lg:text-5xl'>
                {randomMovie.title}
              </h1>
              <p className='text-sm my-4 text-gray-300'>
                {randomMovie.overview}
              </p>
            </div>
          </div>
        )}
      </div>
      <Categories />
    </section>
  );
};

export default Home;
