import LinkButton from "@/components/common/linkButton";
import Logo from "@/components/common/logo";
import { useAppSelector } from "@/store/hooks";

export default function Home() {
    const isLogin = useAppSelector((state) => state.authState.isLogin); // redux store에서 isLogin state 가져옴

    return (
        <div className="flex flex-col gap-5">
            <Logo />
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
                            url="/my_page"
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
