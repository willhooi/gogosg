import {Switch, Route, Redirect,} from 'react-router-dom';
import {HashRouter as Router} from 'react-router-dom';
import Homepage from './Homepage.jsx';
import Display from './Display.jsx';
import Add from './Add.jsx';
import Search from './Search.jsx';
import GoogleLoginComponent from './GoogleLogin.js';
import { GoogleOAuthProvider} from '@react-oauth/google';

import './css/App.css';

const LoginPage = () => {
  return (
    <div>
      {/* Other login options */}
      <GoogleLoginComponent />
    </div>
  );
};

class GoGoSG extends React.Component {
  constructor() {
    super();
    this.state = {searchplaces: []};
    this.searchplaces = this.searchplaces.bind(this);
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
                  <button className="btn btn-danger m-2"><a href="/#/googleLogin">Login</a></button>    
        </div>
        
        <div>
              <Router>
                <Switch>
                  <Redirect exact from="/" to="/home" />
                  <Route path="/home" component={Homepage} />
                  <Route path="/showplaces" component={Display} />
                  <Route path="/addplaces" component={Add} />
                  <Route path="/search" render={
                    (props) => <Search {...props} searchplaces={this.searchplaces} places={this.state.searchplaces} />
                  } />
                  <Route path="/googleLogin" render={<LoginPage/>}/>
            </Switch>
              </Router>
            </div>
          </div>
        </div>
      );
    }
}

const element = <GoGoSG />;
// const element = (
//   <GoogleOAuthProvider clientId="295714145010-s121asiiqgntju3b7km0mja5lef7b80j.apps.googleusercontent.com">
//     <GoGoSG/>
//   </GoogleOAuthProvider>

// );


// ReactDOM.render(
//   <GoogleOAuthProvider clientId="295714145010-s121asiiqgntju3b7km0mja5lef7b80j.apps.googleusercontent.com">
//     <React.StrictMode>
//     <GoGoSG />
//     </React.StrictMode>
//     </GoogleOAuthProvider>
//    , document.getElementById('contents'));
ReactDOM.render(element,document.getElementById('contents'));