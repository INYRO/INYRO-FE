import FormButton from "@/components/account/formButton";
import FormInput from "@/components/account/formInput";
import LinkButton from "@/components/common/linkButton";
import Logo from "@/components/common/logo";
import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/modalSlice";

export default function Login() {
    const dispatch = useAppDispatch();

    const handleModalOpen = () => {
        dispatch(openModal("findPassword"));
    };
    return (
        <div className="w-full p-14 flex flex-col gap-10">
            <Logo />
            <form className="flex flex-col">
                <article className="flex flex-col gap-2.5 mb-[15px]">
                    <FormInput
                        label="학번"
                        isPlaceholder={false}
                        isError={false}
                    />
                    <FormInput
                        label="비밀번호"
                        isPlaceholder={false}
                        isError={true}
                    />
                </article>
                <span className="body-t5 text-accent">
                    학번/비밀번호는 필수 입력입니다.
                </span>
                <article className="flex flex-col gap-[7px] mt-[15px]">
                    <FormButton
                        text="로그인"
                        bgColor="bg-secondary"
                        isBorder={false}
                        textColor="text-white"
                    />
                    <LinkButton
                        text="회원가입"
                        bgColor="bg-white"
                        isBorder={true}
                        textColor="text-black"
                        url="/register"
                    />
                </article>
            </form>
            <button
                onClick={handleModalOpen}
                className="-m-5 body-t6 underline underline-offset-2 cursor-pointer"
            >
                비밀번호 찾기
            </button>
        </div>
    );
}
