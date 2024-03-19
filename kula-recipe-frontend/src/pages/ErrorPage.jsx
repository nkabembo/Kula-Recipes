import { Link } from "react-router-dom";

const ErrorPage = () =>{
    
    return (
        <div id="error-page">
            <h1>Oops!Page Not Found</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <Link to='/'>Return to Home Page</Link>
        </div>
    )
}

export default ErrorPage