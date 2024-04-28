import graphQLFetch from "./graphqlfetch.js";
import './css/Display.css';

function PlaceCard(props) {
    const place = props.place;
    const createdDate = new Date(place.created).toLocaleDateString();
    
    //colour of card changes depending on dataset type
    let cardColorClass='';
    //console.log(place.dataset);
    if (place.dataset == 'attractions') {
        cardColorClass = 'card-orange';
    } else if (place.dataset == 'accommodation') {
        cardColorClass = 'card-green';
    } else if (place.dataset == 'bars-clubs') {
        cardColorClass = 'card-purple';
    } else if (place.dataset == 'user-gen') {
        cardColorClass = 'card-blue';
    }
    else {
        cardColorClass = 'card-red';
    }
    
    //icons changes depending on type (https://icons.getbootstrap.com/)
    let icontype ='bi-alarm';
    if (place.type=='Cafe'|| place.type=='Restaurants'||place.type=='Restaurant'){
        icontype='bi bi-egg-fried';
    }else if (place.type=='Hotels'){
        icontype='bi bi-hospital';
    }else if (place.type=='Nature & Wildlife'){
        icontype='bi bi-tree';
    }
    else {
        icontype='bi bi-suitcase';
    }
    //console.log(place.type,icontype);

    const deleteFavourite = async()=>{
       // console.log(place.name);
        const query = `
            mutation deleteFavouritePlace($placeName:String){
                deleteFavouritePlace(placeName:$placeName)
            }
        `;
        //construct delete parameter
        const placeName = place.name;
        const data = await graphQLFetch(query, {placeName});
        if (data){
            props.onDelete(placeName);
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
                    <p className="card-text mb-0">Added: {createdDate}</p>
                </div>
                <div className="button-container">
                    <button className="btn btn-danger buttonContainer m-2" onClick={deleteFavourite}>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

export default class Display extends React.Component {
    constructor() {
      super();
      this.state = { places: []};
    }
  
    componentDidMount() {
      this.loadData();
    }
    //update display when props is received from Add
    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
          if (this.props.data) {
            this.setState((prevState) => ({
              places: [...prevState.places, this.props.data]
            }));
          }
          //console.log('state changed');
        }
      }
  
    async loadData() {
      const query = `
      {
        listFavourites {
          id
          name
          description
          review
          rating
          created 
          type
          dataset
        }
      }
      `;
      const data = await graphQLFetch(query);
      if (data) {
        this.setState({ places: data.listFavourites });
        console.log(this.state.places);
      }
    }

    deleteFavourite = (name) =>{
        console.log('deleting from state:',name);
        this.setState((prevState)=>({
            places: prevState.places.filter((place)=>place.name !==name)
        }));
        console.log('display state:',this.state.places);
    };

    render() {
        const placesCards = this.state.places.map((place, index) => (
            <PlaceCard key={index} place={place} onDelete={this.deleteFavourite} />
        ));

        const cardRows = [];
        for (let i = 0; i < placesCards.length; i += 4) {
            cardRows.push(
                <div key={i / 4} className="row">
                    {placesCards.slice(i, i + 4)}
                </div>
            );
        }

        return (
            <div className='cardDisplay container'>
                <div className="row justify-content-center">
                    <h5 className="text-center">Favourite Things to-do List</h5>
                </div>
                <div className="row">
                    {cardRows}
                </div>
            </div>
        );
    }
}
