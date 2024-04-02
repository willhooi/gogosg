

export default class AddFav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { favourites: [] };
        this.addToFavourite = this.addToFavourite.bind(this);
    }

    componentDidMount(){
        const storedFav = localStorage.getItem('favourites');
        if (storedFav){
            this.setState({favourites: JSON.parse(storedFav)})
        }
    }

    addToFavourite() {
        const favourite = this.props.favourite;
        console.log(favourite);
        if (!this.state.favourites.includes(favourite)) {
            this.setState(prevState => ({
                favourites: [...prevState.favourites, favourite]
            }), () => {
                localStorage.setItem('favourites', JSON.stringify(this.state.favourites))
                console.log(localStorage);
            });
        }
        else
            console.log('Already added!');
    }

    render() {
        return (
            <div>
                {/* Pass a function reference to onClick */}
                <button className="btn btn-success m-2" onClick={this.addToFavourite}>Add to Favourites</button>
            </div>
        );
    }
}

//implement a button onclick, pass props value set state to fav