import logo from './assets/cityscape-singapore.jpg';
import './css/Homepage.css'; 

export default class Homepage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center"> 
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="image-container">
                                <img src={logo} alt="cityscape" />
                            </div>
                            <div className="card-container">
                                <ul className="list-group borderless">
                                    <li className="list-group-item borderless">👍 Search for places of interests by categories</li>
                                    <li className="list-group-item">👍 Add your favorite places to bookmark them</li>
                                    <li className="list-group-item">👍 View your favorite places as cards collection</li>
                                    <li className="list-group-item">👍 Delete your favourite cards</li>
                                    <li className="list-group-item">👍 Add your own favorite places</li>
                                    <li className="list-group-item">👍 Share your favourite places to a friend!</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

