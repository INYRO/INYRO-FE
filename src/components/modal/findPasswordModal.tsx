import FormButton from "../common/button/formButton";
import FormInput from "../input/formInput";

export default function FindPasswordModal() {
    return (
        <>
            <div className="flex items-end gap-[5px]">
                <span className="body-t2">비밀번호 찾기</span>
                <span className="body-t3 text-background-300">재학생 인증</span>
            </div>
            <form className="flex flex-col gap-[15px]">
                <article className="flex flex-col gap-[5px]">
                    <FormInput
                        isPlaceholder={true}
                        label="학번"
                        isError={false}
                        disabled={false}
                    />
                    <FormInput
                        isPlaceholder={true}
                        label="샘물 비밀번호"
                        isError={true}
                        disabled={false}
                    />
                </article>
                <FormButton
                    text="인증"
                    bgColor="bg-secondary"
                    isBorder={false}
                    textColor="text-white"
                />
            </form>
        </>
    );
}
