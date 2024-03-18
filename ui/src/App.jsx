import './style.css';
import Listing from './Listing.jsx';

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
	return (
	<div>
		<h5>Placeholder for Homepage</h5>
	</div>);
	}
}

class CaiFanKaki extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
   // this.bookTraveller = this.bookTraveller.bind(this);
 
  }

  setSelector(value)
  {
	  this.setState({selector: value});
  }
  
  render() {
    return (
    <div>
        <h1>CaiFan Kaki</h1>
	    <div>
            <button onClick={()=>this.setSelector(1)}>Homepage</button>
            <button onClick={()=>this.setSelector(2)}>Listing</button>
            
	    </div>
        {
            this.state.selector === 1? <Homepage />:<hr/>
        }
        {
            this.state.selector === 2? <Listing />:<hr/>
        }
     
    </div>
    );
  }
}

const element = <CaiFanKaki />;

ReactDOM.render(element, document.getElementById('contents'));