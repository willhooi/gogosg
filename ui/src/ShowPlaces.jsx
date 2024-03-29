import PlaceCard from "./PlaceCard.jsx";


export default function ShowPlaces(props) {

	const placeCards = props.places.map((place, index) => (
	  <PlaceCard 
	  	key={index} 
		place={place} 
		/>
	));
  
	return (
	  <div className="row m-2">
		{placeCards}
	  </div>
	);
  }
