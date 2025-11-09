import FormButton from "../common/button/formButton";
import FormInput from "../input/formInput";

export default function ChangePasswordModal() {
    return (
        <>
            <div className="flex items-end gap-[5px]">
                <span className="body-t2">비밀번호 변경</span>
                <span className="body-t3 text-background-300">
                    4자 이상 입력
                </span>
            </div>
            <form className="flex flex-col gap-[15px]">
                <article className="flex flex-col gap-[5px]">
                    <FormInput
                        isPlaceholder={true}
                        label="새 비밀번호 입력"
                        isError={false}
                        disabled={false}
                    />
                    <FormInput
                        isPlaceholder={true}
                        label="비밀번호 재확인"
                        isError={true}
                        disabled={false}
                    />
                </article>
                <FormButton
                    text="변경하기"
                    bgColor="bg-secondary"
                    isBorder={false}
                    textColor="text-white"
                />
            </form>
        </>
    );
}
