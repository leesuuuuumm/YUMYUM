import { RssFeed } from "@material-ui/icons";
import React from 'react';
import './Card.css';


function Card(props) {
    const [name, setName] = useState("Your name");
    const [about, setAbout] = useState("ddfsfsdfsdf");

    return (
        <div className="Card">
            <div className="upper-container">
                <div className="image-container">
                    <img src="" alt="" height="100px" width="100px" />
                </div>
            </div>
            <div className="lower-container">
                <h3>{ name }</h3>
                <h3>{ job }</h3>
                <p>{ about }</p>
            </div>
        </div>
    );
}

export default Card;