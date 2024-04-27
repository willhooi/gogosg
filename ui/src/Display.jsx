import graphQLFetch from "./graphqlfetch.js";
import './css/Display.css';

function PlacesRow(props) {
	const place = props.place;
	return (
	  <tr>
        <td>{place.id}</td>
		<td>{place.name}</td>
		<td>{place.description}</td>
        <td>{place.review}</td>
		<td>{place.rating}</td>
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
	  <table className="col-4 table bordered-table text-center rounded">
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
            <div className='tableDisplay'>
                <div className="emptySpace"></div>
                <div className="displaySpace">
                    <h5>Favourite List</h5>
                    <div>
                        <ShowPlaces places={this.state.places} />
                    </div>
                <div className="emptySpace"></div>
                </div>

                
                
            </div>)
    }
}