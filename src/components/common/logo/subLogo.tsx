import { Link } from "react-router-dom";

export default function SubLogo() {
    return (
        <section className="text-center">
            <Link to="/">
                <h2>INYRO</h2>
            </Link>
            <h4>IN You, Run Onward</h4>
        </section>
    );
}
