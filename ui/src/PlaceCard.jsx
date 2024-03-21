export default function PlaceCard(props) {
	const place = props.place;

	return (
	  <div className="card">
		<div className="card-body row">
			<div className="col-2">Image Placeholder</div>
			<div className="col-4">
				<h5 className="card-title">{place.name}</h5>
				<p className="card-text">{`${place.address.streetName}, ${place.address.postalCode}`}</p>
				<p className="card-text">{place.description}</p>
			</div>
            <div className="col-4">
                {place.reviews && place.reviews.length > 0 ? (
                    <ul>
                        {place.reviews.map((review,index)=>(
                            <li key={index}>{review.text}</li>
                        ))}
                    </ul>
                ): ('No reviews available')
                }
            </div>
			<div className="col-2">
				<p className="card-text">Rating: {place.rating}</p>
			</div>
		</div>
	  </div>
	);
  }
 