import {Switch, Route, Redirect,} from 'react-router-dom';
import {HashRouter as Router} from 'react-router-dom';
import Homepage from './Homepage.jsx';
import Display from './Display.jsx';
import Add from './Add.jsx';
import Search from './Search.jsx';

import './css/App.css';

class CaiFanKaki extends React.Component {
  constructor() {
    super();
    this.state = {searchplaces: []};
    this.searchplaces = this.searchplaces.bind(this);
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
      //console.log(this.state.searchplaces);
    };
  
  render() {
    return (
      <div className="row">
          <h1>CaiFan Kaki</h1>
        <div>
              <button className="btn btn-success m-2"><a href="/#/home">Homepage</a></button>
              <button className="btn btn-success m-2"><a href="/#/showplaces">Show places</a></button>
              <button className="btn btn-success m-2"><a href="/#/addplaces">Add places</a></button>
              <button className="btn btn-success m-2"><a href="/#/search">Search</a></button>
              
        </div>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={Homepage} />
            <Route path="/showplaces" component={Display} />
            <Route path="/addplaces" component={Add} />
            <Route path="/search" render={
              (props) => <Search {...props} searchplaces={this.searchplaces} places={this.state.searchplaces} />
            }/>
          </Switch>
        </Router>
      </div>
      );
  }
}

const element = <CaiFanKaki />;

ReactDOM.render(element, document.getElementById('contents'));