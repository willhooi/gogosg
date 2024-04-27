import graphQLFetch from "./graphqlfetch.js";

function PlacesRow(props) {
	const place = props.place;
	return (
	  <tr>
        <td>{place.id}</td>
		<td>{place.name}</td>
		<td>{place.description}</td>
        <td>{place.review}</td>
		<td>{place.rating}</td>
		<td></td>
	  </tr>
	);
  }

function ShowPlaces(props) {
	const placesRows = [];
	props.places.forEach((item, index) =>{
		placesRows.push(<PlacesRow key={index} place={item} />)
	}
	);
  
	return (
	  <table className="col-4 table bordered-table text-center">
		<thead>
		  <tr>
			<th>No</th>
			<th>Name</th>
			<th>Description</th>
			<th>Review</th>
            <th>Rating</th>
		  </tr>
		</thead>
		<tbody>
		  {placesRows}
		</tbody>
	  </table>
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
        console.log('query started');
      const query = `
      {
        listFavourites {
          id
          name
          description
          review
          rating 
        }
      }
      `;
      const data = await graphQLFetch(query);
      if (data) {
        this.setState({ places: data.listFavourites });
        console.log(this.state.places);
      }
    }

    render(){
        return(
            <div>
                <h5>Placeholder for Listing</h5>
                <div>
                    <ShowPlaces places={this.state.places} />
                </div>
                
            </div>)
    }
}