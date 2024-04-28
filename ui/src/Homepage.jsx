import logo from './assets/cityscape-singapore.jpg';

export default class Homepage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row justify-content-center"> 
                <div className="col-md-6">
                        <img src={logo} alt="cityscape-image" className="img-fluid rounded mx-auto d-block" />
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <p className="list-group-item">This web app allows users to:</p>
                        <ul className="list-group">
                            <span className="mr-2"><i className="bi bi-back"></i> search for areas of interests in Singapore (attractions, bars & clubs, food & beverage and  accommodation)</span>
                            <span className="mr-2"><i className="bi bi-back"></i> add search items as to-do cards in favorite list</span>
                            <span className="mr-2"><i className="bi bi-back"></i> view to-do cards in favorite list</span>
                            <span className="mr-2"><i className="bi bi-back"></i> delete to-do cards in favorite list (coming)</span>
                            <span className="mr-2"><i className="bi bi-back"></i> edit/update favorite list (coming)</span>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}