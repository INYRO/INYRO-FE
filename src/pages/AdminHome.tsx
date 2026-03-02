/*
 * AdminHome.tsx 파일은 관리자의 메인 페이지입니다.
 *
 * 관리자 계정으로 접속 시 '유저 관리'와 '예약 관리' 버튼이 보입니다.
 */

import LinkButton from "@/components/common/button/LinkButton";
import Logo from "@/components/common/logo/Logo";

export default function AdminHome() {
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
