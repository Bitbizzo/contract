/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const VideoPlayer = ({ videoData, isLoading }) => {
  if (isLoading) {
    return <p>Loading...</p>; // Display loading message while data is being fetched
  }

  // Use map() to iterate over videoData and return an array of JSX elements
  return (
    <div className="grid grid-cols-3 text-sm gap-8">
      {videoData.map((video) => {
        // Check if the video site is YouTube and a video key is provided
        if (video.site === 'YouTube' && video.key) {
          // Create the YouTube video URL using the key from the JSON data
          const videoUrl = `https://www.youtube.com/embed/${video.key}`;

          // Return an iframe element to play the video
          return (
            <div key={video.id}>
              <h2>{video.name}</h2>
              <iframe
                title={video.name}
                src={videoUrl}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen></iframe>
            </div>
          );
        } else {
          // Return a message if the video is not available
          return <p key={video.id}>Video not available</p>;
        }
      })}
    </div>
  );
};

export default VideoPlayer;
