import MainLogo from "@/components/common/mainLogo";

export default function MyPage() {
    return (
        <div className="v-stack w-full">
            <div className="mb-11">
                <MainLogo />
            </div>
            <div className="flex flex-col gap-[30px]">
                <section className="flex flex-col gap-[15px]">
                    <p className="body-t1">내 정보</p>
                    <article className="flex flex-col gap-[5px]">
                        <p className="body-t1">김수뭉</p>
                        <div className="flex gap-2 body-t3">
                            <div className="flex gap-1">
                                <span>학번</span>
                                <span>202511111</span>
                            </div>
                            <span>&#183;</span>
                            <div className="flex gap-1">
                                <span>학과</span>
                                <span>컴퓨터과학전공</span>
                            </div>
                        </div>
                    </article>
                </section>
                <section className="flex flex-col gap-[15px]">
                    <p className="body-t1">예약 기록</p>
                    <article className="w-full h-[175px] bg-background-200 rounded-[5px]"></article>
                </section>
                <section className="flex justify-between">
                    <span className="body-t1">비밀번호 변경</span>
                    <button className="btn-sub2">변경하기</button>
                </section>
                <section className="flex justify-between">
                    <span className="body-t1">회원 탈퇴</span>
                    <button className="btn-sub2">탈퇴하기</button>
                </section>
            </div>
        </div>
    );
}
