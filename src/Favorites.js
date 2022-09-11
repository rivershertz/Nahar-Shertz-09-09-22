import Card from "./Card";
import { useFavorites } from "./contexts/FavoritesContext";

function Favorites() {
  const favorites = useFavorites();

  return (
    <div className="md:w-3/5 mx-auto mt-14 ">
      <h1 className="text-6xl mx-auto text-center">
        My favorites <span>&#10084;</span>
      </h1>
      <div className="grid lg:grid-cols-3 gap-5 mt-10 w-full h-fit">
        {favorites.map((location) => (
          <Card
            location={location.name}
            key={location.ID}
            weatherText={location.currentWeather.text}
            temperature={location.currentWeather.temperature}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
