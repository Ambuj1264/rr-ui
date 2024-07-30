import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 found-div">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3">
                    <span className="text-danger">
                        <b>Oops!</b>
                    </span>{" "}
                    Page not found.
                </p>
                <p className="lead">The page you're looking for doesn't exist.</p>
                <Link to="/" className="btn btn_primary btn_services">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;  





