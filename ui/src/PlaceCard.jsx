import './PlaceCard.css';
import fetchImage from './components/fetchImage.jsx';


export default function PlaceCard(props) {
    const place = props.place;

    const fetchAndSetImage = () => {
        fetchImage(place.images, place.uuid, handler);
    };

    const handler = (blob, plcUuid) => {
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.src = url;
        img.className = "rounded";
        img.onload = () => {
            const element = document.getElementById(plcUuid);
            if (element) {
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                element.appendChild(img);
            }
        };
    };

    fetchAndSetImage();

    return (
        <div className="card-container">
            <div className="card-body row">
                <div id={place.uuid} className="card-image col-md-4"></div>
                <div className="d-flex flex-column col-md-2">
                    <h5 className="card-place">{place.name}</h5>
                    <p className="card-address">{`${place.address.streetName}, ${place.address.postalCode}`}</p>
                    <p className="card-description">{place.description}</p>
                </div>
                <div className="card-reviews col-md-5">
                    {place.reviews && place.reviews.length > 0 ? (
                        <ul>
                            {place.reviews.map((review, index) => (
                                <li key={index}>{review.text}</li>
                            ))}
                        </ul>
                    ) : ('No reviews available')}
                </div>
                <div className="col-md-1">
                    <p className="card-rating">Rating: {place.rating}</p>
                </div>
            </div>
            <div className='card-fav row'>
                <button className='btn btn-success'>Add Favourite </button>
            </div>
        </div>
    );
}
