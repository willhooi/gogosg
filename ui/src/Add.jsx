import Display from "./Display.jsx";
import graphQLFetch from "./graphqlfetch.js";

export default class Add extends React.Component {
	constructor() {
    super();
    this.state = {
      name: '',
      review: '',
      description: '',
      rating: '',
      type: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
	}

  async handleSubmit(e){
    e.preventDefault();
    //organize form values as parameter to addInput
    const placeDetails ={
      name: this.state.name,
      review: this.state.review,
      description: this.state.description,
      rating: parseInt(this.state.rating),
      type: this.state.type,
      created: new Date()
    };
    await this.addInput(placeDetails);
    this.setState({
      name: '',
      review: '',
      description: '',
      rating: '',
      type: '',
    })
  };

  handleInputChange(e){
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  };

  //function for graphqlfetch
  async addInput(placeDetails){
    const query = `
        mutation addFavouritePlace($placeDetails: PlaceDetailsInputs!) 
        {
           addFavouritePlace(placeDetails: $placeDetails)
        }   
      `;
    //construct input data placeDetails
    const res = await graphQLFetch(query, {placeDetails});
    console.log(res);
  }

  render(){
    return (
        <div>
            <div>
                <Display />
            </div>
            <div>
              <form onSubmit={this.handleSubmit}>
              <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter name"
                  value = {this.state.name}
                  onChange = {this.handleInputChange}
                  required
                />
                <br />
                <input
                  type="text"
                  name="review"
                  className="form-control"
                  placeholder="Enter Review"
                  value = {this.state.review}
                  onChange = {this.handleInputChange}
                  required
                />
                <br />
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Enter description"
                  value = {this.state.description}
                  onChange = {this.handleInputChange}
                  required
                />
                 <br />
                 <select
                    name="rating"
                    className="form-control"
                    value={this.state.rating}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">Select Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <br />
                  <select
                    name="type"
                    className="form-control"
                    value={this.state.type}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Attractions">Attractions</option>
                    <option value="Accomodation">Accomodation</option>
                    <option value="Bars & Clubs">Bars & Clubs</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                  </select>
                  <br/>
                <button className="btn btn-danger m-2">Contribute</button>
              </form>
            </div>
           
        </div>);
	}
}