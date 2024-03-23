//for future use
export default function ReviewCard(props) {
	const place = props.place;

  
	return (
	  <div className="card">
		<div className="card-body row">
			<div className="col-3">Image Placeholder</div>
			<div className="col-8">
				<h5 className="card-title">{place.name}</h5>
				<p className="card-text">{`${place.address.streetName}, ${place.address.postalCode}`}</p>
				<p className="card-text">{place.description}</p>
			</div>
			<div className="col-1">
				<p className="card-text">Rating: {place.rating}</p>
			</div>
		</div>
	  </div>
	);
  }
 