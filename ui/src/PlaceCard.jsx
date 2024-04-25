import './css/PlaceCard.css';
import graphQLFetch from './graphqlfetch.js';


export default function PlaceCard(props) {
    const place = props.place;

    const fetchImage = (imgUuid, plcUuid, handler) => {
        if (imgUuid.length > 0 && imgUuid[0].uuid) {
            fetch(`https://api.stb.gov.sg/media/download/v2/${imgUuid[0].uuid}?fileType=Medium%20Thumbnail`, {
                method: 'GET',
                headers: {
                    'X-API-Key': 'gS8i7oE7GLfMLZnnA0tZOwXTNSDgPqwB',
                },
            })
            .then(res => res.blob())
            .then(blob => handler(blob, plcUuid))
            .catch(error => console.error('Error fetching image', error));
        } else {
            console.log('No image found');
        }
    }

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
    
    //ADD TO DB USING GRAPHQLFETCH
    const addFavPlace = async (place)=> {
        const mutation = `
        mutation addToFavlist($name: String!) 
        {
          addToFavlist(nameInput: $name)
      }
      `;
      await graphQLFetch(mutation, {name: place});
      };
   

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
                <div>
                    <button className="btn btn-success" onClick={()=>addFavPlace(place.name)}>
                        Add to Favourite
                    </button>
                </div>
            </div>
        </div>
    );
}
