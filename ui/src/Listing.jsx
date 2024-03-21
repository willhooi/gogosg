import gqlfetch from "./graphql";


function PlacesRow(props) {
	const place = props.place;
	return (
	  <tr>
		<td>{place.name}</td>
		<td>{`${place.address.streetName}, ${place.address.postalCode}`}</td>
		<td>{place.description}</td>
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
	  <table className="col-4 table bordered-table text-center">
		<thead>
		  <tr>
			<th>Name</th>
			<th>Address</th>
			<th>Description</th>
			<th>Rating</th>
		  </tr>
		</thead>
		<tbody>
		  {placesRows}
		</tbody>
	  </table>
	);
  }

export default class Listing extends React.Component {
	constructor() {
	super();
	this.state = {places: []};
	}

	componentDidMount(){
		this.listplaces();
	}

	async listplaces(){

		const response = await fetch('https://api.stb.gov.sg/content/food-beverages/v2/search?searchType=keyword&searchValues=%22hawker%20food%22&sort=name&sortOrder=asc',{
			method: 'GET',
      		headers: { 
				'Content-Type': 'application/json',
				'Host': 'api.stb.gov.sg',
				'Accept': 'application/json',
				'X-Content-Language':'en',
				'X-API-Key':'gS8i7oE7GLfMLZnnA0tZOwXTNSDgPqwB',
				},
		});
		const data = await response.json();	
		this.setState({places : data.data });
		console.log(this.state.places);
		};


	render(){
	return (
	<div>
		<h5>Placeholder for Listing</h5>
		<div>
			<ShowPlaces places={this.state.places} />
		</div>
	</div>);
	}
}