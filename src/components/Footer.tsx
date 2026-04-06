import {Link }  from "react-router";
import "../Style.css";

function Footer(){
    const currentYear = new Date().getFullYear();

    return(
        <>
            <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                <h2>BlogSpace</h2>
                <p>Share your stories, inspire the world.</p>
                </div>

                <div className="footer-links">
                <div className="footer-section">
                    <h4>Explore</h4>
                    <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/create">Write Blog</Link></li>
                    </ul>
                </div>

                

                <div className="footer-section">
                    <h4>Connect</h4>
                    <ul>
                    <li><a href="https://x.com/">Twitter</a></li>
                    <li><a href="https://github.com/">GitHub</a></li>
                    <li><a href="https://discord.com/">Discord</a></li>
                    </ul>
                </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} BlogSpace. All rights reserved.</p>
            </div>
    </footer>

        </>
    )
}

export default Footer;