function Card({ location, weatherText, temperature }) {
  return (
    <div className="h-36 shadow-lg bg-white relative flex flex-col justify-center rounded-md">
      <p className="text-md absolute top-2 left-6">
        {temperature}
        <span>&#176;</span>
      </p>
      <h2 className="text-2xl text-center">{location}</h2>
      <h3 className="text-lg text-center ">{weatherText}</h3>
    </div>
  );
}

export default Card;
