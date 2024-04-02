
export default function DisplayFav(props) {
    const favourite = props.props;
    return (
        <div className="row m-2">
             <ul>
                    {favourite.map((data, index)=>(
                        <li key={index}>{data.name}</li>
                    ))}
                </ul>
        </div>
    );
}
