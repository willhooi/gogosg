export default class Add extends React.Component {
	constructor() {
	super();
	}

    render(){
    return (
        <div>
            <h5>Placeholder for Add</h5>
            <div>
            <form className="form" action="#" method="post">
            <label for="place_name">Name of Place:</label>
            <br></br>
            <input className="form-control" type="text" id="place_name" name="place_name" required></input>
            <label for="ratings">Ratings:</label>
            <br></br>
            <input className="form-control" type="number" id="ratings" name="ratings" min="1" max="5" required></input>
            <label for="image">Image:</label>
            <br></br>
            <input className="form-control" type="file" id="image" name="image"></input>
            <button className="btn btn-success m-2">Submit</button>
            </form>

            </div>
        </div>);
	}
}