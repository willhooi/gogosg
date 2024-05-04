import ShowPlaces from "./ShowPlaces.jsx";
import './css/Display.css';

export default class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchType: 'attractions',
        key:0, //keep track of changes
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
      console.log('user passed to search:',this.props.user);
     
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const form = document.forms.searchItem;
      const searchItem = form.searchitem.value;
      const searchType = this.state.searchType;
      this.props.searchplaces(searchItem, searchType); 
      form.searchitem.value = '';
    }
  
    handleSearchTypeChange(e) {
      this.setState({
        searchType: e.target.value,
        key: this.state.key +1,//use as event listener
      });
    }
  
    render() {
      return (
        <div className="row">
          <div className="card-container col-md-6">
              <h5>GO where in Singapore?</h5>
              <p>Search different places of interest.You can specify different attraction types and see what come up.</p>
              <form name="searchItem" onSubmit={this.handleSubmit}>
                <select
                  className="form-select"
                  value={this.state.searchType}
                  onChange={this.handleSearchTypeChange}
                >
                  <option value="attractions">Attractions (e.g. zoo, museum, etc)</option>
                  <option value="accommodation">Accomodation (e.g. hotels, Orchard, etc)</option>
                  <option value="bars-clubs">Bars & Clubs (e.g. wine, beer, music, etc)</option>
                  <option value="food-beverages">Food & Beverages (e.g. coffee, local cuisine, etc)</option>
                </select>
                <input
                  type="text"
                  name="searchitem"
                  className="form-control"
                  placeholder="Search Item"
                  required
                />
                <button className="btn btn-danger m-2">Search</button>
              </form>
          </div>
            <ShowPlaces places={this.props.places} key={this.state.key} user={this.props.user} email={this.props.email} />
        </div>
      );
    }
}