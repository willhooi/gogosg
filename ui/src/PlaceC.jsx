import './css/PlaceCard.css';
import graphQLFetch from './graphqlfetch.js';


export default class PlaceCard extends React.Component {
    constructor(props){
        super(props);
        this.fetchImage = this.fetchImage.bind(this);
        this.handler = this.handler.bind(this);
        this.addFavPlace = this.addFavPlace.bind(this);
    }

    fetchImage = (imgUuid, plcUuid, handler) => {
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

    async fetchAndSetImage(){
        await this.fetchImage(this.props.place.images, this.props.place.uuid, this.handler);
    };

    handler = (blob, plcUuid) => {
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

    componentDidMount(){
        this.fetchAndSetImage();

    };
    
    //ADD TO DB USING GRAPHQLFETCH
    async addFavPlace(place){
        const mutation = `
        mutation addToFavlist($name: String!) 
        {
          addToFavlist(nameInput: $name)
      }
      `;
      await graphQLFetch(mutation, {name: place});
      };
   

    render(){
        return(
            <div className="card-container">
            <div className="card-body row">
                <div id={this.props.place.uuid} className="card-image col-md-4"></div>
                <div className="d-flex flex-column col-md-2">
                    <h5 className="card-place">{this.props.place.name}</h5>
                    <p className="card-address">{`${this.props.place.address.streetName}, ${this.props.place.address.postalCode}`}</p>
                    <p className="card-description">{this.props.place.description}</p>
                </div>
                <div className="card-reviews col-md-5">
                    {this.props.place.reviews && this.props.place.reviews.length > 0 ? (
                        <ul>
                            {this.props.place.reviews.map((review, index) => (
                                <li key={index}>{review.text}</li>
                            ))}
                        </ul>
                    ) : ('No reviews available')}
                </div>
                <div className="col-md-1">
                    <p className="card-rating">Rating: {this.props.place.rating}</p>
                </div>
                <div>
                    <button className="btn btn-success" onClick={()=>this.addFavPlace(this.props.place.name)}>
                        Add to Favourite
                    </button>
                </div>
            </div>
        </div>

        );
    }
}
