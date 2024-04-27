import ShowPlaces from "./ShowPlaces.jsx";
import './css/Display.css';

export default class Search extends React.Component {
    constructor() {
      super();
      this.state = {
        searchType: 'attractions', 
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const form = document.forms.searchItem;
      const searchItem = form.searchitem.value;
      const searchType = this.state.searchType;
      this.props.searchplaces(searchItem, searchType); // Pass both search item and search type
      form.searchitem.value = '';
    }
  
    handleSearchTypeChange(e) {
      this.setState({
        searchType: e.target.value,
      });
    }
  
    render() {
      return (
        <div className="container m-2">
          <h5 className="text-center">What's in Singapore?</h5>
          <p className="text-center">Search for different attractions or accomodation available in Singapore.
            Check out the different bars & clubs to visit. Don't forget to try our local delights too!
          </p>
  
          <div className="row m-2">
            <div>
              <form name="searchItem" onSubmit={this.handleSubmit}>
                <select
                  className="form-select"
                  value={this.state.searchType}
                  onChange={this.handleSearchTypeChange}
                >
                  <option value="attractions">Attractions</option>
                  <option value="accommodation">Accomodation</option>
                  <option value="bars-clubs">Bars & Clubs</option>
                  <option value="food-beverages">Food & Beverages</option>
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
            <div className="scrollable-container">
              <ShowPlaces places={this.props.places} />
            </div>
          </div>
        </div>
      );
    }
}