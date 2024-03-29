import './PlaceCard.css';

async function getImg(args,args2) {
	args.length > 0 && args[0].uuid ? await fetch('https://api.stb.gov.sg/media/download/v2/'+ args[0].uuid + '?fileType=Medium%20Thumbnail' , {
		method: 'GET',
		  headers: { 
			'X-API-Key':'gS8i7oE7GLfMLZnnA0tZOwXTNSDgPqwB',
			},
	})
	.then(res => res.blob())
	.then(blob => handler(blob,args2))
	.catch(error => console.error('Error fetching image', error))
	 : console.log('No image found')
}

function handler(blob,args2){
	const url = URL.createObjectURL(blob);
	const img = new Image();
	img.src = url;
	img.className ="rounded";
	img.onload = () => {
		const element = document.getElementById(args2);
		if (element) {element.appendChild(img)}
	}
}

export default function PlaceCard(props) {
	const place = props.place;
	getImg(place.images,place.uuid);
	
	//const FavouriteComponent = props.favouriteComponent;
	//FETCH IMG CODE STARTS
	//console.log(place);
	
	
	//FETCH IMG CODE END

	return (
	  <div className="card-container">
		<div className="card-body row">
			<div id={place.uuid} className="card-image col-md-4">
		
			</div>
			<div className="d-flex flex-column col-md-8">
				<h5 className="card-place">{place.name}</h5>
				<p className="card-address">{`${place.address.streetName}, ${place.address.postalCode}`}</p>
				<p className="card-description">{place.description}</p>
			</div>
            <div className="card-reviews d-flex">
                {place.reviews && place.reviews.length > 0 ? (
                    <ul>
                        {place.reviews.map((review,index)=>(
                            <li key={index}>{review.text}</li>
                        ))}
                    </ul>
                ): ('No reviews available')
                }
            </div>
			<div className="d-flex">
				<p className="card-rating">Rating: {place.rating}</p>
			</div>
			
		</div>
	  </div>
	);
  }
 