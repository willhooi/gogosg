import ShowPlaces from "./ShowPlaces.jsx";
import AddFavourite from "./components/AddFavourite.jsx";

export default class Search extends React.Component {
	constructor() {
	super();
	this.state = {searchplaces: [], favourites: []};
    this.handleSubmit = this.handleSubmit.bind(this);
	}

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.searchItem;
        const searchplace = {
          name: form.searchitem.value,
        }
        this.searchplaces(searchplace);
        form.searchitem.value = "";
      }

	async searchplaces(args){
        console.log(args);

		const response = await fetch('https://api.stb.gov.sg/content/food-beverages/v2/search?searchType=keyword&searchValues='+args.name+'&sort=name&sortOrder=asc',{
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
		this.setState({searchplaces : data.data });
		console.log(this.state.searchplaces);
		};


	render(){
	return (
	<div className="container m-2">
		<h5>Placeholder for Search</h5>
		
		<div className="row m-2">
            <div> 
                <form name="searchItem" onSubmit={this.handleSubmit}>
                    <input type="text" name="searchitem" className="form-control" placeholder="Search Item" required/>
                    <button className="btn btn-secondary m-2">Search</button>
                </form>
            </div>
            <div><ShowPlaces places={this.state.searchplaces} favouriteComponent = {AddFavourite}/></div>
				
		</div>

	</div>);
	}
}