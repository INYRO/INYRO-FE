/*
 * Home.tsx 파일은 reserve.inyro.com의 메인 랜딩 페이지를 담고 있습니다.
 *
 * 로그인 시 '동방 예약'과 '마이페이지' 버튼이 보이며,
 * 비 로그인 시 '로그인' 버튼만 보입니다.
 */

import LinkButton from "@/components/common/button/LinkButton";
import Logo from "@/components/common/logo/Logo";
import { useAppSelector } from "@/store/hooks";

export default function Home() {
    const isLogin = useAppSelector((state) => state.authState.isLogin); // redux store에서 isLogin state 가져옴

    return (
        <div className="flex flex-col gap-5">
            <Logo />
            <section className="flex flex-col w-full gap-2.5">
                {isLogin ? (
                    <>
                        <LinkButton url="/reserve" text="동방 예약" />
                        <LinkButton
                            url="/mypage"
                            text="마이페이지"
                            variant="outline"
                        />
                    </>
                ) : (
                    <LinkButton url="/login" text="로그인" />
                )}
            </section>
        </div>
    );
}
