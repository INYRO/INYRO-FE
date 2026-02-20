import LinkButton from "@/components/common/button/LinkButton";
import Logo from "@/components/common/logo/Logo";

export default function AdminHome() {
    return (
        <div className="relative flex h-full w-full justify-center">
            <div className="flex flex-col items-center justify-center gap-5 w-full">
                <Logo />
                <section className="flex flex-col w-full items-center gap-2.5">
                    <LinkButton
                        url="/admin/user"
                        text="유저 관리"
                        className="w-[150px] h-[35px]"
                    />
                    <LinkButton
                        url="/admin/reserve"
                        text="예약 관리"
                        variant="outline"
                        className="w-[150px] h-[35px]"
                    />
                </section>
            </div>
        </div>
    );
}
