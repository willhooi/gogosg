import logo from './assets/cityscape-singapore.jpg';

export default class Homepage extends React.Component {
	constructor() {
	super();
	}

    render(){
    return (
        <div>
            <img src={logo} alt="cityscape-image" className="img-fluid rounded mx-auto d-block m-2"/>
            <p className="text-center">This web app allows users to:
                <li className="list-group-item">* search for areas of interests in Singapore (attractions, bars & clubs, food & beverage and  accomodation)</li>  
                <li className="list-group-item">* add search items as to-do cards in favourite list</li>
                <li className="list-group-item">* view to-do cards in favourite list</li>
                <li className="list-group-item">* delete to-do cards in favourite list (coming)</li>
                <li className="list-group-item">* edit/update favourite list (coming)</li>
            </p>
        </div>);
	}
}