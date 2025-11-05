import { Outlet } from "react-router-dom";
import Modal from "./components/common/modal";

function App() {
    return (
        <>
            <main className="layout">
                <Outlet />
            </main>
            <Modal />
        </>
    );
}

export default App;
