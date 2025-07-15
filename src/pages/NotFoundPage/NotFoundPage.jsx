import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
return (
    <div className={css.container}>
        <h1>404</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/" className={css.link}>Go back to Home</Link>
    </div>
);
};

export default NotFoundPage;