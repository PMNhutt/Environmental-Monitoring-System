const VideoBackground = () => {
  return (
    <video className="h-[65vh] w-full object-cover clip-video" autoPlay muted loop>
      <source src="src/assets/videos/home.mp4" type="video/mp4" />
    </video>
  );
};

export default VideoBackground;
