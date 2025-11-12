import MainLogo from "@/components/common/logo/mainLogo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openModal } from "@/store/modalSlice";

export default function MyPage() {
    const dispatch = useAppDispatch();
    const handleModalOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.id;
        if (id === "change") dispatch(openModal("changePassword"));
        if (id === "delete") dispatch(openModal("deleteAccount"));
    };

    const { sno, dept, name } = useAppSelector((state) => state.authState);

    const dummy = [
        { date: "2025.10.04 (토)", time: "12:00 ~ 14:00" },
        { date: "2025.10.05 (토)", time: "22:00 ~ 13:00" },
        { date: "2025.10.06 (토)", time: "11:00 ~ 12:00" },
        { date: "2025.10.07 (토)", time: "14:00 ~ 15:00" },
        { date: "2025.10.08 (토)", time: "10:00 ~ 9:00" },
    ];

    return (
        <div className="v-stack w-full">
            <div className="mb-11">
                <MainLogo />
            </div>
            <div className="flex flex-col gap-[30px]">
                <section className="flex flex-col gap-[15px]">
                    <p className="body-t1">{}</p>
                    <article className="flex flex-col gap-[5px]">
                        <p className="body-t1">김수뭉</p>
                        <div className="flex gap-2 body-t3">
                            <div className="flex gap-1">
                                <span>{name}</span>
                                <span>{sno}</span>
                            </div>
                            <span>&#183;</span>
                            <div className="flex gap-1">
                                <span>학과</span>
                                <span>{dept}</span>
                            </div>
                        </div>
                    </article>
                </section>
                <section className="flex flex-col gap-[15px]">
                    <p className="body-t1">예약 기록</p>
                    <table className="w-full rounded-[5px]">
                        <thead className="bg-background-200 border">
                            <tr className="*:py-1.5 *:text-center body-t5">
                                <td className="">날짜</td>
                                <td className="border-r border-l">시간대</td>
                                <td>상태</td>
                            </tr>
                        </thead>
                        <tbody className="border-x border-b">
                            {dummy.map((data, idx) => (
                                <tr
                                    key={idx}
                                    className=" body-t6 text-center *:py-1.5 border-b"
                                >
                                    <td>{data.date}</td>
                                    <td className="border-r border-l">
                                        {data.time}
                                    </td>
                                    <td className="flex items-center justify-evenly">
                                        <button className="btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] border-background-200 bg-background-[#f5f5f5]">
                                            변경
                                        </button>
                                        <button className="btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] border-background-200 bg-background-[#f5f5f5]">
                                            취소
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <section className="flex justify-between">
                    <span className="body-t1">비밀번호 변경</span>
                    <button
                        id="change"
                        onClick={handleModalOpen}
                        className="btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] border-background-200 bg-background-[#f5f5f5]"
                    >
                        변경하기
                    </button>
                </section>
                <section className="flex justify-between">
                    <span className="body-t1">회원 탈퇴</span>
                    <button
                        id="delete"
                        onClick={handleModalOpen}
                        className="btn-sub2 px-1.5 py-[1.5px] border rounded-[5px] border-background-200 bg-background-[#f5f5f5]"
                    >
                        탈퇴하기
                    </button>
                </section>
            </div>
        </div>
    );
}
