import './css/PlaceCard.css';
import graphQLFetch from './graphqlfetch.js';

export default class PlaceCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            buttonClicked: false,
        };
        this.fetchImage = this.fetchImage.bind(this);
        this.handler = this.handler.bind(this);
        //this.addFavPlaceDetails = this.addFavPlaceDetails.bind(this);
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
    
   
    async addFavPlaceDetails(place){
       // console.log(place);
        const query = `
        mutation addFavouritePlace($placeDetails: PlaceDetailsInputs!) 
        {
           addFavouritePlace(placeDetails: $placeDetails)
        }   
      `;
      //construct the input data
      const { name, reviews, rating, description, type} = place;
      const review = reviews && reviews.length > 0 ? reviews[0].text : 'No reviews available';
      const created = new Date();
      const placeDetails = { name, review, rating, description, created, type};
      const res = await graphQLFetch(query, {placeDetails});
      console.log('Added ok:',res.addFavouritePlace);
      this.setState({buttonClicked: true});
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
                <div className="button-container">
                    <button 
                        className="btn btn-danger" 
                        onClick={()=>this.addFavPlaceDetails(this.props.place)}
                        disabled = {this.state.buttonClicked}
                    >
                        {this.state.buttonClicked ? "Added to Favourites" : "Add to Favourites"}
                    </button>
                </div>
            </div>
        </div>

        );
    }
}
