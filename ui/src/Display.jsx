import Share from "./Share.jsx";
import graphQLFetch from "./graphqlfetch.js";
import './css/Display.css';
import { getCardColorClass, getIconType } from "./utils.js";

function PlaceCard(props) {
    const place = props.place;
    const createdDate = new Date(place.created).toLocaleDateString();
    const cardColorClass = getCardColorClass(place.dataset);
    const icontype = getIconType(place.type);

    const deleteFavourite = async()=>{
       // console.log(place.name);
       try {
        const query = `
            mutation deleteFavouritePlace($placeName:String){
                deleteFavouritePlace(placeName:$placeName)
            }
        `;
        const placeName = place.name;
        const data = await graphQLFetch(query, { placeName });
        if (data) {
            props.onDelete(placeName);
        }
    } catch (error) {
        console.error('Error deleting favorite place:', error);
    }
    }

    return (
        <div className="col-md-3 mb-3 p-2">
            <div className={`card shadow ${cardColorClass}`}>
                <div className="card-body">
                    <p className="card-title"><b>{place.name}</b></p>
                    <p className="card-text mb-1"><i>{place.type}</i><i className={`m-3 ${icontype}`}></i></p>
                    <p className="card-text mb-1">{place.description}</p>
                    <p className="card-text mb-1">Review: {place.review}</p>
                    <p className="card-text mb-1">Rating: {place.rating}</p>
                    <p className="card-text mb-0">Date: {createdDate}</p>
                    <p className="card-text mb-0">Added by:{place.user}({place.email})</p>

                </div>
                <div className="button-container">
                    <button className="btn btn-secondary buttonContainer m-2" onClick={deleteFavourite}>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

export default class Display extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        places: [],
        user: this.props.user,//get username from login
        email: this.props.email,//get username from login
        newData:'',
    };
    }
  
    componentDidMount() {
      //this.listUserFavRecord(this.state.user); //query user name
      this.listUserFavRecord(this.state.email); // query based on email 
    }

    componentDidUpdate(prevProps) {
        if (this.props.newData !== prevProps.newData) {
            this.setState({ newData: this.props.newData });
        }
    }
    

  
    async listUserFavRecord(user) {
        const query = `
        query listUserFavRecord($user:String){
            listUserFavRecord(user:$user){
                id
                name
                description
                review
                rating
                created 
                type
                dataset
                user
                email
            }
        }
        `;
        const data = await graphQLFetch(query,{user});
       // console.log('user:',user);
        if (data) {
          this.setState({ places: data.listUserFavRecord });
         // console.log('Fav places state:',this.state.places);
        }
      }

    deleteFavourite = (name) =>{
        console.log('deleting from state:',name);
        this.setState((prevState)=>({
            places: prevState.places.filter(place=>place.name !==name)
        }));
        //console.log('display state:',this.state.places);
    };


    render() {
        const placesCards = this.state.places.map((place, index) => (
            <PlaceCard key={index} place={place} onDelete={this.deleteFavourite} user={this.state.user} email={this.state.email}/>
        ));

        const cardRows = [];
            for (let i = 0; i < placesCards.length; i += 4) {
                cardRows.push(
                    <div key={i / 4} className="row">
                        {placesCards.slice(i, i + 4)}
                    </div>
                );
            }
        //if nothing to display
        let displayContent;
        (placesCards.length > 0) ? 
            displayContent = cardRows : displayContent=<h6>No card available</h6>;

        return (
            <div className='cardDisplay container'>
                <div className="row justify-content-center">
                    <h5 className="text-center">My favourite to GO places</h5>
                </div>
                <div className="row">
                    {displayContent}
                </div>
                <div>
                    <Share />
                </div>
            </div>
        );
    }
}
