import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../utils/api';
import VideoPlayer from '../components/VideoPlayer';

const fetchVideos = async () => {
  const response = await axiosInstance.get('/tv/1399/videos', {
    params: {
      language: 'en-US',
    },
  });
  return response.data; // Return the data from the response
};

const Reels = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['shortVideos'],
    queryFn: fetchVideos,
  });
  // Handle loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Handle error state
  if (error) {
    console.error('Error fetching videos:', error);
    return <p>Error loading videos.</p>;
  }

  // Check data and data.results existence
  const videoData = data?.results || [];

  if (data) {
     return (
       <section>
         <h1 className='text-white'>Short Reels</h1>
         <VideoPlayer videoData={videoData} isLoading={isLoading} />
       </section>
     );
  }
 
};

export default Reels;


