import { Link } from "react-router-dom"

const Public = () => {

    const content = (
        <section className="public">
            <header>
                <h1>Welcome to The Spotify Clone</h1>
            </header>
            
            <footer>
                <Link to="/auth/login">User Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public