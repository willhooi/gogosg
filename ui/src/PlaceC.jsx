import './css/PlaceCard.css';
import graphQLFetch from './graphqlfetch.js';

export default class PlaceCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            imgLoaded: false,
            placeName: '',
            buttonDisabled:false,
            alreadyAdded: false,
            user:this.props.user,
            email:this.props.email
        };
        this.fetchImage = this.fetchImage.bind(this);
        this.handler = this.handler.bind(this);
        console.log('user passed to placecard:',this.state.user)
        //this.addFavPlaceDetails = this.addFavPlaceDetails.bind(this);
    }

    fetchImage = (imgUuid, plcUuid, handler) => {
        this.setState({imgLoaded: false});
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

    fetchAndSetImage(){
        this.fetchImage(this.props.place.images, this.props.place.uuid, this.handler);
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
                this.setState({imgLoaded:true});
            } 
        };
    };

    componentDidMount(){
        this.fetchAndSetImage();
        this.listFavPlaceName();//fetch placename added previously
    };
    //ensure that img loaded is synchronized with the fetched data
    componentDidUpdate(prevProps){
        if(prevProps.place !== this.props.place){
            this.fetchAndSetImage();
        }
    }
    //FETCH favlist place name
    async listFavPlaceName() {
        const query = `
        {
          listFavPlaceName {
            name
          }
        }
        `;
        const data = await graphQLFetch(query);
        if (data) {
          this.setState({ placeName: data.listFavPlaceName});
        }
      }
    
    //ADD TO DB USING GRAPHQLFETCH
    async addFavPlaceDetails(place){
       //console.log(place);
        const query = `
        mutation addFavouritePlace($placeDetails: PlaceDetailsInputs!) 
        {
           addFavouritePlace(placeDetails: $placeDetails)
        }   
      `;
      //construct the input data
        const { name, reviews, rating, description, type, dataset} = place;
        const review = reviews && reviews.length > 0 ? reviews[0].text : 'No reviews available';
        const created = new Date();
        const user = this.state.user;
        const email = this.state.email;
        //console.log('user passed to placedetails:',user);
        const placeDetails = { name, review, rating, description, created, type, dataset, user, email};
        const res = await graphQLFetch(query, {placeDetails});
        console.log('Added ok:',res.addFavouritePlace);
        //check if already added
        (res.addFavouritePlace)?
        this.setState({
            buttonDisabled: res.addFavouritePlace,
        }):
        this.setState({
            alreadyAdded: !res.addFavouritePlace,
            buttonDisabled: !res.addFavouritePlace
        })
    };

      render(){
        const buttonText = this.state.buttonDisabled  ? "Added to Favourites" : "Add to Favourites";
        const message = this.state.alreadyAdded ? 
            <h6 className="text-warning m-2">Already added!</h6> :
            (this.state.placeName.includes(this.props.place.name)) ? 
            <h6 className="text-success m-2">Place added successfully!</h6> :
            null;

        return(
            <div className="card-container">
            <div className="card-body row">
                <div id={this.props.place.uuid} className="card-image col-md-4">
                    
                </div>
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
                        className="btn btn-success"
                        onClick={() => this.addFavPlaceDetails(this.props.place)}
                        disabled={this.state.buttonDisabled}
                    >
                        {buttonText}
                    </button>
                </div>
                {message}
            </div>
        </div>
        );
    }
}
