import LinkButton from "@/components/common/button/linkButton";
import MainLogo from "@/components/common/logo/mainLogo";
import { useAppSelector } from "@/store/hooks";

export default function Home() {
    const isLogin = useAppSelector((state) => state.authState.isLogin); // redux store에서 isLogin state 가져옴

    return (
        <div className="flex flex-col gap-5">
            <MainLogo />
            <section className="flex flex-col w-full gap-2.5">
                {isLogin ? (
                    <>
                        <LinkButton
                            url="/reserve"
                            text="동방 예약"
                            bgColor="bg-secondary"
                            textColor="text-white"
                            isBorder={false}
                        />
                        <LinkButton
                            url="/mypage"
                            text="마이페이지"
                            bgColor="bg-white"
                            textColor="text-black"
                            isBorder={true}
                        />
                    </>
                ) : (
                    <LinkButton
                        url="/login"
                        text="로그인"
                        bgColor="bg-secondary"
                        textColor="text-white"
                        isBorder={true}
                    />
                )}
            </section>
        </div>
    );
}
