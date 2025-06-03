import { NavLink } from "react-router-dom"
import './Welcome.css'

export function Welcome() {
    return (
        <div className='welcome'>
            <img src="https://animeshokanbucket.s3.us-east-2.amazonaws.com/06473b3210e1457b9f8a1a331cd1a684.png" alt="AnimeShoKan" />
            <h1>Welcome to the AnimeShoKan!</h1>
            <div id="navCatalogs">
                <NavLink className="navCatalog" to="/anime"><h1>Anime</h1></NavLink>
                <NavLink className="navCatalog" to="/character"><h1>Character</h1></NavLink>
            </div>
            <h1>Search for your favorite anime here!</h1>
        </div>
    )
}