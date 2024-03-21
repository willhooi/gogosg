import Homepage from './Homepage.jsx';
import Listing from './Listing.jsx';
import Add from './Add.jsx';
import Search from './Search.jsx';

class CaiFanKaki extends React.Component {
  constructor() {
    super();
    this.state = {selector: 1};
   // this.bookTraveller = this.bookTraveller.bind(this);
    }

    setSelector(value)
    {
        this.setState({selector: value});
    }
  
    render() {
    return (
    <div className="row">
        <h1>CaiFan Kaki</h1>
	    <div>
            <button className="btn btn-success m-2" onClick={()=>this.setSelector(1)}>Homepage</button>
            <button className="btn btn-success m-2" onClick={()=>this.setSelector(2)}>Show places</button>
            <button className="btn btn-success m-2" onClick={()=>this.setSelector(3)}>Add places</button>
            <button className="btn btn-success m-2" onClick={()=>this.setSelector(4)}>Search</button>
            
	    </div>
        {this.state.selector === 1? <Homepage />:<></>}
        {this.state.selector === 2? <Listing />:<></>}
        {this.state.selector === 3? <Add />:<></>}
        {this.state.selector === 4? <Search />:<></>}
     
    </div>
    );
  }
}

const element = <CaiFanKaki />;

ReactDOM.render(element, document.getElementById('contents'));