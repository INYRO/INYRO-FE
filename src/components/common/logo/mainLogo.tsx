import { Link } from "react-router-dom";

export default function MainLogo() {
    return (
        <section className="text-center">
            <Link to="/">
                <h1>INYRO</h1>
            </Link>
            <h3>IN You, Run Onward</h3>
        </section>
    );
}
