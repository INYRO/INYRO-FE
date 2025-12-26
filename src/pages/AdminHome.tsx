import MainLogo from "@/components/common/logo/mainLogo";
import LinkButton from "@/components/common/button/linkButton";
import { useAppSelector } from "@/store/hooks";

export default function AdminHome() {
    const isLogin = useAppSelector((state) => state.authState.isLogin);

    return (
        <div className="relative flex h-full w-full justify-center">
            <div className="flex flex-col items-center justify-center gap-5 w-full">
                <MainLogo />
                <section className="flex flex-col w-full items-center gap-2.5">
                    {isLogin ? (
                        <>
                            <LinkButton
                                url="/admin/user"
                                text="유저 관리"
                                bgColor="bg-white"
                                textColor="text-black"
                                isBorder={true}
                                fullWidth={false}
                                className="w-[150px] h-[35px]"
                            />

                            <LinkButton
                                url="/admin/reserve"
                                text="예약 관리"
                                bgColor="bg-white"
                                textColor="text-black"
                                isBorder={true}
                                fullWidth={false}
                                className="w-[150px] h-[35px]"
                            />
                        </>
                    ) : (
                        <LinkButton
                            url="/login?redirect=/admin"
                            text="관리자 로그인"
                            bgColor="bg-secondary"
                            textColor="text-white"
                            isBorder={false}
                        />
                    )}
                </section>
            </div>
        </div>
    );
}
