import PlaceC from "./PlaceC.jsx";

export default function ShowPlaces(props) {

	const placeCards = props.places.map((place, index) => (
	  <PlaceC 
	  	key={index} 
		place={place}
		user={props.user}
		/>
	));
	console.log('user passed to showplaces:',props.user);
  
	return (
	  <div className="row m-2">
		{placeCards}
	  </div>
	);
  }
