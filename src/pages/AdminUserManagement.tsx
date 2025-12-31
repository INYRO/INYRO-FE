import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import MainLogo from "@/components/common/logo/mainLogo";
import sortIcon from "@/assets/icons/lsicon_sort-filter-filled.svg";
import FormButton from "@/components/common/button/formButton";
import type {
    MemberListResponse,
    MemberResult,
    MemberStatus,
} from "@/types/auth";

export default function AdminUserManagement() {
    const [members, setMembers] = useState<MemberResult[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [sortType, setSortType] = useState("NAME");
    const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
    const [isLoading, setIsLoading] = useState(false);

    // 유저 목록 가져오기
    const fetchMembers = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await axiosInstance.get<MemberListResponse>(
                "/admin/members",
                {
                    params: { sortType, order, page: 0, size: 100 },
                }
            );

            if (res.data.isSuccess) {
                setMembers(res.data.result.content);
            }
        } finally {
            setIsLoading(false);
        }
    }, [sortType, order]);

    // 목록 select
    const toggleSelect = useCallback((sno: string) => {
        setSelected((prev) =>
            prev.includes(sno) ? prev.filter((v) => v !== sno) : [...prev, sno]
        );
    }, []);

    // user Status 업데이트
    const updateStatus = useCallback(
        async (id: number, status: MemberStatus) => {
            await axiosInstance.patch(
                `/admin/members/${id}/status`,
                {},
                { params: { status } }
            );
            await fetchMembers();
        },
        [fetchMembers]
    );

    // 정렬 방향 변경
    const toggleOrder = useCallback(() => {
        setOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    }, []);

    // 선택 유저 삭제
    const deleteSelectedUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        if (selected.length === 0) return;
        try {
            await axiosInstance.delete("/admin/members/withdrawal", {
                data: { snoList: selected },
            });
            setSelected([]);
            await fetchMembers();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void fetchMembers();
    }, [fetchMembers]);

    return (
        <div className="v-stack w-full gap-6">
            <MainLogo />
            <section className="flex items-center justify-between">
                <h2 className="inline-block body-t2 font-bold text-main underline underline-offset-[6px] decoration-[2px]">
                    유저 리스트
                </h2>

                <div className="flex items-center gap-2 body-t6 text-background-300">
                    <select
                        className="border border-background-200 rounded-[5px] px-2 py-1 body-t6 bg-background-100"
                        value={sortType}
                        onChange={(e) => {
                            setSortType(e.target.value);
                        }}
                    >
                        <option value="NAME">이름</option>
                        <option value="DEPARTMENT">학과</option>
                        <option value="SNO">학번</option>
                    </select>

                    <button
                        type="button"
                        onClick={toggleOrder}
                        className="p-0 bg-transparent border-0 outline-none"
                        aria-label={order === "ASC" ? "오름차순" : "내림차순"}
                        title={order === "ASC" ? "오름차순" : "내림차순"}
                    >
                        <img
                            src={sortIcon}
                            alt=""
                            className={`w-[15px] h-[15px] ${
                                order === "DESC" ? "rotate-180" : ""
                            } cursor-pointer`}
                        />
                    </button>
                </div>
            </section>
            <section className="border border-background-200 rounded-[10px] bg-background-100 overflow-hidden">
                <table className="w-full text-center table-fixed border-collapse">
                    <thead className="bg-background-200">
                        <tr className="body-t6 text-main">
                            <th className="w-[25px] py-2 border-r border-background-200"></th>
                            <th className="w-[45px] py-2 text-center border-r body-t5 border-background-200">
                                이름
                            </th>
                            <th className="w-[70px] py-2 text-center border-r body-t5 border-background-200">
                                학번
                            </th>
                            <th className="w-[110px] py-2 text-center border-r body-t5 border-background-200">
                                전공
                            </th>
                            <th className="py-2 text-center body-t5">상태</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-3 py-6 text-center body-t4 text-background-300"
                                >
                                    목록을 불러오는 중입니다...
                                </td>
                            </tr>
                        ) : members.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-3 py-6 text-center body-t4 text-background-300"
                                >
                                    등록된 유저가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            members.map((m) => (
                                <tr
                                    key={m.id}
                                    className="border-t border-background-200 hover:bg-stroke"
                                >
                                    <td className="py-2 border-r border-background-200 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(m.sno)}
                                            onChange={() => toggleSelect(m.sno)}
                                        />
                                    </td>

                                    <td className="py-2 body-t6 border-r border-background-200 text-center">
                                        {m.name}
                                    </td>

                                    <td className="py-2 body-t6 border-r border-background-200 text-center">
                                        {m.sno}
                                    </td>

                                    <td className="py-2 body-t6 border-r border-background-200 text-center">
                                        {m.dept}
                                    </td>
                                    <td className="py-2 text-center">
                                        <select
                                            className="border w-11 h-4 border-background-200 rounded-[5px] px-1 body-t7 bg-background-100 appearance-none"
                                            value={m.status}
                                            onChange={(e) => {
                                                console.log(m.id);
                                                void updateStatus(
                                                    m.id,
                                                    e.target
                                                        .value as MemberStatus
                                                );
                                            }}
                                            style={{
                                                backgroundImage:
                                                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition:
                                                    "right 8px center",
                                                backgroundSize: "10px 12px",
                                            }}
                                        >
                                            <option value="ENROLLED">
                                                재학
                                            </option>
                                            <option value="LEAVE">휴학</option>
                                            <option value="WITHDRAWN">
                                                자퇴
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
            <form onSubmit={(e) => void deleteSelectedUser(e)}>
                <FormButton
                    text="선택삭제"
                    bgColor="bg-accent"
                    isBorder={false}
                    textColor="text-white"
                    isLoading={isLoading}
                />
            </form>
        </div>
    );
}
