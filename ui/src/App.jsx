import {Switch, Route, Redirect,} from 'react-router-dom';
import {HashRouter as Router} from 'react-router-dom';
import Homepage from './Homepage.jsx';
import Display from './Display.jsx';
import Add from './Add.jsx';
import Search from './Search.jsx';
import {jwtDecode} from 'jwt-decode';
import './css/App.css';

class GoGoSG extends React.Component {
  constructor() {
    super();
    this.state = { searchplaces: [], user: {} };
    this.icons = ['👨', '🦁', '🐯', '🐵', '🐻', '🐹', '🐮', '🐷'];
    this.searchplaces = this.searchplaces.bind(this);
    this.handleCallbackResponse = this.handleCallbackResponse.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    google.accounts.id.initialize({
      client_id: "295714145010-s121asiiqgntju3b7km0mja5lef7b80j.apps.googleusercontent.com",
      callback: this.handleCallbackResponse
    });
    if (Object.keys(this.state.user).length === 0) {
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "small", 
        type: "standard", logo_alignment:"center"}
      );
    }
  }

  handleCallbackResponse(response) {
    const userObject = jwtDecode(response.credential);
    this.setState({ user: userObject });
    document.getElementById("signInDiv").hidden = true;
  }

  handleSignOut() {
    this.setState({ user: {} });
    document.getElementById("signInDiv").hidden = false;
  }

  async searchplaces(searchItem, searchType){
     console.log(searchItem, searchType);

     //FORMAT OF API SEARCH
     //Attraction: https://api.stb.gov.sg/content/attractions/v2/search
     //F&B: https://api.stb.gov.sg/content/food-beverages/v2/search
     //Accomodation: https://api.stb.gov.sg/content/accommodation/v2/search
     //Bar & Clubs: https://api.stb.gov.sg/content/bars-clubs/v2/search

      const response = await fetch('https://api.stb.gov.sg/content/'+searchType+'/v2/search?searchType=keyword&searchValues='+searchItem+'&sort=name&sortOrder=asc',{
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

    render() {
      if (Object.keys(this.state.user).length === 0) {
        return (
          <div className="container">
            <div className="row">
              <h1 className="text-center"><b>GO GO SG</b></h1>
              <p className="text-center">Collect your favourite places in Singapore!</p>
            </div>
          </div>
        );
      }
  
      const randomIconIndex = Math.floor(Math.random() * this.icons.length);
      const randomIcon = this.icons[randomIconIndex];
  
      return (
        <div className="container">
          <div className="row">
            <h1 className="text-center"><b>GO GO SG</b></h1>
            <p className="text-center">Collect your favourite places in Singapore!</p>
            <div className="col text-center">
              <button className="btn btn-danger m-2"><a href="/#/home">Home</a></button>
              <button className="btn btn-danger m-2"><a href="/#/search">Search</a></button>
              <button className="btn btn-danger m-2"><a href="/#/showplaces">Display</a></button>
              <button className="btn btn-danger m-2"><a href="/#/addplaces">Add</a></button>
              <button className="btn btn-danger m-2" onClick={this.handleSignOut}>Sign Out</button>
              <div className="icon">{randomIcon}</div>
              <h5>{this.state.user.family_name}</h5>
            </div>
            <div>
              <Router>
                <Switch>
                  <Redirect exact from="/" to="/home" />
                  <Route path="/home" component={Homepage} />
                  <Route path="/showplaces" component={Display} />
                  <Route path="/addplaces" component={Add} />
                  <Route path="/search" render={(props) => <Search {...props} searchplaces={this.searchplaces} places={this.state.searchplaces} />} />
                </Switch>
              </Router>
            </div>
          </div>
        </div>
      );
    }
  }
  
  const element = <GoGoSG />;
  
  ReactDOM.render(element, document.getElementById('contents'));