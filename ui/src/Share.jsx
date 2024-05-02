import './css/Display.css';
import graphQLFetch from "./graphqlfetch.js";
import emailjs from '@emailjs/browser';

export default class Share extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailAdd: '',
            sharePlaces: [],
            emailContent: '',
            isEmailSent: false,
            isError: false
        };
        this.form = React.createRef();
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const query = `
            {
                listFavourites {
                    id
                    name
                    description
                    review
                    rating
                    created 
                    type
                    dataset
                }
            }
        `;
        const data = await graphQLFetch(query);
        if (data) {
            this.setState({ sharePlaces: data.listFavourites }, this.composeEmailContent);
            //console.log('Places to be shared:', this.state.sharePlaces);
        }
    }

    handleEmailChange = (e) => {
        this.setState({ emailAdd: e.target.value });
    };

    // compose body using some place data
    composeEmailContent = () => {
        const { sharePlaces } = this.state;
        const sortedPlaces = sharePlaces.slice().sort((a, b) => b.rating - a.rating);
        const starIcon = "⭐";
        const emailContent = sortedPlaces
            .map((place, index) => `${index + 1}.   ${place.rating} ${starIcon} - ${place.name}: ${place.description}.`)
            .join('\n');
        this.setState({ emailContent });
    };

    //share display to someone
    shareDisplayViaEmail = (e) => {
        e.preventDefault();
        const { emailContent, emailAdd } = this.state;

        //EmailJS credentials
        const SERVICE_ID = 'service_p6ar5bz';
        const TEMPLATE_ID = 'template_04asoak';
        const PUBLIC_KEY ='P2h3bK5DEUVWebHHW';

        //Using EmailJS webservice
        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, this.form.current, {
                publicKey: PUBLIC_KEY, 
                to_email: emailAdd,
                message_html: emailContent,
            })
            .then(
                (response) => {
                    console.log('Email sent successfully!', response);
                    this.setState({ isEmailSent: true, isError: false });
                },
                (error) => {
                    console.error('Error sending email:', error);
                    this.setState({ isEmailSent: false, isError: true });
                }
            );
    };

    render() {
        //outro message after form submit
        const { isEmailSent, isError } = this.state;
        let message;
        if (isEmailSent) {
            message = <h6 className="text-success">Email sent successfully!</h6>;
        } else if (isError) {
            message = <h6 className="text-danger">Error sending email. Please try again later.</h6>;
        } else {
            message = null;
        }
        return (
            <div className="card-container col-md-6">
                <h5>Share your favourite attractions with someone</h5>
                <form id="email-form" ref={this.form} onSubmit={this.shareDisplayViaEmail}>
                    <input
                        type="email"
                        name="to_email"
                        className="form-control"
                        placeholder="Enter recipient's email address"
                        value={this.state.emailAdd}
                        onChange={this.handleEmailChange}
                        required
                    />
                    <input 
                        type="text" 
                        name="from_name" 
                        placeholder="Enter inviter's name"
                        className="form-control"
                        required
                    />
                    <input type="hidden" name="message_html" value={this.state.emailContent} />
                    <input type="hidden" name="place_count" value={Object.keys(this.state.sharePlaces).length} />
                    <button type="submit" className="btn btn-primary m-2">
                        Share via EmailJS
                    </button>
                    {message}
                </form>
            </div>
        );
    }
}