import { Outlet } from "react-router-dom";
import ModalLayout from "./components/common/modalLayout";
import { logout } from "./store/authSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

function App() {
    const dispatch = useAppDispatch(); // isLogin 상태를 upload 위한 dispatch 선언
    const isLogin = useAppSelector((state) => state.authState.isLogin); // redux store에서 isLogin state 가져옴

    /* 로그아웃 handling function */
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <>
            <main className="relative flex flex-col max-w-sm mx-auto items-center justify-center gap-5 min-h-screen p-9">
                {/* 세션 로그아웃 버튼 */}
                {isLogin && (
                    <button
                        onClick={handleLogout}
                        className="top-0 right-0 absolute btn-sub2 m-5 px-2 py-1 border border-background-200 rounded-md"
                    >
                        로그아웃
                    </button>
                )}
                {/* children element */}
                <Outlet />
            </main>
            <ModalLayout />
        </>
    );
}

export default App;
