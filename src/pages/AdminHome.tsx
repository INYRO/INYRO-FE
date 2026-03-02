/*
 * AdminHome.tsx 파일은 관리자의 메인 페이지입니다.
 *
 * 관리자 계정으로 접속 시 '유저 관리'와 '예약 관리' 버튼이 보이며,
 * 비 로그인 / 혹은 비 관리자일 경우, alert을 띄우고 main('/')로 내보냅니다.
 *
 * navigate에 'replace: true'를 넣으면 뒤로가기 했을 때 다시 관리자 페이지로 오는 걸 막아줍니다
 */

import LinkButton from "@/components/common/button/LinkButton";
import Logo from "@/components/common/logo/Logo";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
    const { isLogin, user } = useAppSelector((state) => state.authState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin || user?.sno !== "Bossisme") {
            alert("관리자만 접근할 수 있습니다!");
            void navigate("/", { replace: true });
        }
    }, [isLogin, user, navigate]);

    return (
        <div className="flex flex-col gap-5">
            <Logo />
            <section className="flex flex-col w-full items-center gap-2.5">
                <LinkButton url="/admin/user" text="유저 관리" />
                <LinkButton
                    url="/admin/reserve"
                    text="예약 관리"
                    variant="outline"
                />
            </section>
        </div>
    );
}
