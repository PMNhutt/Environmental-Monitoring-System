const ImagesBackground = () => {
  return (
    <div className="absolute w-full flex justify-between transform -translate-y-[200px] -z-[1] overflow-hidden">
      <img src="src/assets/images/map_1.png" className="object-cover" />
      <img src="src/assets/images/map_2.png" className="object-cover" />
    </div>
  );
};

export default ImagesBackground;
