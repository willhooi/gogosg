import Display from "./Display.jsx";

export default class Add extends React.Component {
	constructor() {
	super();
	}

    render(){
    return (
        <div>
            <div>
                <Display />
            </div>
            <div>
              <form>
              <input
                  type="text"
                  name="additem"
                  className="form-control"
                  placeholder="Contribute new item"
                  required
                />
                <button className="btn btn-danger m-2">Contribute</button>
              </form>
            </div>
           
        </div>);
	}
}