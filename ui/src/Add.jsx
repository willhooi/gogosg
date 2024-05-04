import Display from "./Display.jsx";
import graphQLFetch from "./graphqlfetch.js";

export default class Add extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      name: '',
      review: '',
      description: '',
      rating: '',
      type: '',
      newData:'',
      showDisplay: false,
      user: this.props.user,
      email: this.props.email,

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
	}

  handleSubmit(e){
    e.preventDefault();
    //organize form values as parameter to addInput
    const {} = this.state;
    const { name, review, description, rating, type, user, email } = this.state;
    const placeDetails={
      name,
      review,
      description,
      rating: parseInt(rating),
      type,
      created: new Date(),
      dataset:'user-gen',
      user,
      email
    };
    this.addInput(placeDetails);
   
    this.setState({
      name: '',
      review: '',
      description: '',
      rating: '',
      type: '',
      newData: placeDetails,
      showDisplay:true,
      user:'',
      email:'',
    });
   
  };

  handleInputChange(e){
    this.setState({
      [e.target.name]: e.target.value
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
    console.log('placedetails:',res);
  }

  render(){
    return (
        <div className="row">
            <div className="card-container col-md-6">
           
              <h5>Add your own GO to favourite place</h5>
              <form onSubmit={this.handleSubmit}>
              <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name of place"
                  value = {this.state.name}
                  onChange = {this.handleInputChange}
                  required
                />
             
                <input
                  type="text"
                  name="review"
                  className="form-control"
                  placeholder="What you think about of this place?"
                  value = {this.state.review}
                  onChange = {this.handleInputChange}
                  required
                />
                
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="How do you describe this place"
                  value = {this.state.description}
                  onChange = {this.handleInputChange}
                  required
                />
               
                 <select
                    name="rating"
                    className="form-control"
                    value={this.state.rating}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">How would rate this place?</option>
                    <option value="1">★</option>
                    <option value="2">★★</option>
                    <option value="3">★★★</option>
                    <option value="4">★★★★</option>
                    <option value="5">★★★★★</option>
                  </select>
                
                  <select
                    name="type"
                    className="form-control"
                    value={this.state.type}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">What type of place is this?</option>
                    <option value="Attractions">Attractions</option>
                    <option value="Accommodation">Accomodation</option>
                    <option value="Bars & Clubs">Bars & Clubs</option>
                    <option value="Food & Beverages">Food & Beverages</option>
                  </select>
                
                  <div className="button-container">
                    <button type="submit" className="btn btn-danger m-2">Add</button>
                  </div>
              </form>
            </div>
        </div>);
	}
}