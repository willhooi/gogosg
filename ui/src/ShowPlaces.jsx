import PlaceCard from "./PlaceCard.jsx";
import AddFavourite from "./components/AddFavourite.jsx";


export default function ShowPlaces(props) {
	const favComponent = props.favouriteComponent;
	

	const placeCards = props.places.map((place, index) => (
	  <PlaceCard key={index} place={place} favouriteComponent = {AddFavourite} favComponent ={favComponent}/>
	));
  
	return (
	  <div className="row m-2">
		{placeCards}
	  </div>
	);
  }
