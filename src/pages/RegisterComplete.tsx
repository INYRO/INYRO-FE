import FormButton from "@/components/account/formButton";
import FormInput from "@/components/account/formInput";
import MainLogo from "@/components/common/logo/mainLogo";

export default function RegisterComplete() {
    return (
        <div className="v-stack w-full gap-10">
            <MainLogo />
            <form className="flex flex-col">
                <article className="flex flex-col gap-2.5 mb-[15px]">
                    <FormInput
                        label="학번"
                        isPlaceholder={false}
                        isError={false}
                        disabled={true}
                    />
                    <FormInput
                        label="비밀번호"
                        isPlaceholder={false}
                        isError={true}
                        disabled={false}
                    />
                </article>
                <span className="body-t5 text-accent">
                    비밀번호는 필수 입력입니다.
                </span>
                <article className="flex flex-col gap-[7px] mt-[15px]">
                    <FormButton
                        text="회원가입"
                        bgColor="bg-secondary"
                        isBorder={false}
                        textColor="text-white"
                    />
                </article>
            </form>
        </div>
    );
}
