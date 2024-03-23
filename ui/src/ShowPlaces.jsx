import PlaceCard from "./PlaceCard.jsx";
import AddFavourite from "./components/AddFavourite.jsx";


export default function ShowPlaces(props) {

	const placeCards = props.places.map((place, index) => (
	  <PlaceCard key={index} place={place} favouriteComponent = {AddFavourite}/>
	));
  
	return (
	  <div className="row m-2">
		{placeCards}
	  </div>
	);
  }
