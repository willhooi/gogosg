import logo from './assets/cityscape-singapore.jpg';
import './css/Homepage.css'; 
import {Link} from 'react-router-dom';

export default class Homepage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
                <div className="row justify-content-center"> 
                        <div className="col-md-6">
                            <div className="image-container">
                                <img src={logo} alt="cityscape" />
                            </div>
                            <div>
                                <p className="text-center m-2"><b>GO GO SG</b> is a fun way to check out 
                                interesting place of interest for tourist in Singapore. With GO GO SG, you can gamify your travel
                                experience by collecting your to-go places and even share them with your friends!
                                </p>
                                    <div className="card-container">👍 Search for places of interests by categories. 
                                        <Link to="/search" className="btn btn-danger btn-sm m-2">Search</Link></div>
                                    <div className="card-container">👍 Add your favorite places to bookmark them.<button className="btn btn-success btn-sm m-2">Add to Favourite</button></div>
                                    <div className="card-container">👍 View your favorite places as cards collection. 
                                        <Link to="/showplaces" className="btn btn-danger btn-sm m-2">Display</Link></div>
                                    <div className="card-container">👍 Delete your favourite cards. <button className="btn btn-secondary btn-sm m-2">Remove</button></div>
                                    <div className="card-container">👍 Add your own favorite places. 
                                        <Link to="/addplaces" className="btn btn-danger btn-sm m-2">Add</Link></div>
                                    <div className="card-container">👍 Share your favourite places to a friend! <button className="btn btn-primary btn-sm m-2">Share via EmailJS</button></div> 
                            </div>
                        </div>
                </div>
        );
    }
}

