import ShowPlaces from "./ShowPlaces.jsx";

export default class Search extends React.Component {
	constructor() {
	super();
	//this.state = {searchplaces: []};
    this.handleSubmit = this.handleSubmit.bind(this);

	}

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.searchItem;
        const searchplace = {
          name: form.searchitem.value,
        }
        this.props.searchplaces(searchplace);
        form.searchitem.value = "";
      }

	
	render(){
	return (
	<div className="container m-2">
		<h5>Search for Food Item</h5>
		
		<div className="row m-2">
            <div> 
                <form name="searchItem" onSubmit={this.handleSubmit}>
                    <input type="text" name="searchitem" className="form-control" placeholder="Search Item" required/>
                    <button className="btn btn-secondary m-2">Search</button>
                </form>
            </div>
            <div>
				<ShowPlaces places={this.props.places}/>
			</div>	
		</div>

	</div>);
	}
}