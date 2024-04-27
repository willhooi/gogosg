import graphQLFetch from "./graphqlfetch.js";
import './css/Display.css';

function PlaceCard(props) {
    const place = props.place;
    const createdDate = new Date(place.created).toLocaleDateString();
    
    //colour of card changes depending on ratings
    let cardColorClass='';
    if (place.rating >= 4.7) {
        cardColorClass = 'card-orange';
    } else if (place.rating >= 4.5) {
        cardColorClass = 'card-green';
    } else if (place.rating >= 4.2) {
        cardColorClass = 'card-blue';
    } else {
        cardColorClass = 'card-purple';
    }
    
    return (
        <div className="col-md-3 mb-3 p-2">
            <div className={`card shadow ${cardColorClass}`}>
                <div className="card-body">
                    <p className="card-title"><b>{place.name}</b></p>
                    <p className="card-text mb-1"><i className="font-italic">{place.type}</i></p>
                    <p className="card-text mb-1">{place.description}</p>
                    <p className="card-text mb-1">Review: "{place.review}"</p>
                    <p className="card-text mb-1">Rating: {place.rating}</p>
                    <p className="card-text mb-0">Added: {createdDate}</p>
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
        }
      }
      `;
      const data = await graphQLFetch(query);
      if (data) {
        this.setState({ places: data.listFavourites });
        console.log(this.state.places);
      }
    }

    render() {
        const placesCards = this.state.places.map((place, index) => (
            <PlaceCard key={index} place={place} />
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
                    <h5 className="text-center">Favourite List</h5>
                </div>
                <div className="row">
                    {cardRows}
                </div>
            </div>
        );
    }
}