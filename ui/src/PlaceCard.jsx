import './PlaceCard.css';


export default function PlaceCard(props) {
	const place = props.place;
	const FavouriteComponent = props.favComponent;

	
	return (
	  <div className="card-container">
		<div className="card-body row">
			<div className="col-3">Image Placeholder</div>
			<div className="col-2">
				<h5 className="card-place">{place.name}</h5>
				<p className="card-address">{`${place.address.streetName}, ${place.address.postalCode}`}</p>
				<p className="card-description">{place.description}</p>
			</div>
            <div className="card-reviews col-5">
                {place.reviews && place.reviews.length > 0 ? (
                    <ul>
                        {place.reviews.map((review,index)=>(
                            <li key={index}>{review.text}</li>
                        ))}
                    </ul>
                ): ('No reviews available')
                }
            </div>
			<div className="col-1">
				<p className="card-rating">Rating: {place.rating}</p>
			</div>
			<div className="overlay d-flex align-items-center justify-content row">
				<FavouriteComponent />
			</div>
		</div>
	  </div>
	);
  }
 