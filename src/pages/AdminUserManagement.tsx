import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import sortIcon from "@/assets/icons/lsicon_sort-filter-filled.svg";
import FormButton from "@/components/common/button/FormButton";
import type {
    MemberListResponse,
    MemberResult,
    MemberStatus,
} from "@/types/member";
import Logo from "@/components/common/logo/Logo";

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
            // res에 현재 id가 포함되어있지 않음.
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
        // 현재 id를 받아오지 못함.
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
            <Logo />
            <section className="flex items-center justify-between">
                <h2 className="inline-block body-t2 font-bold text-main underline underline-offset-[6px] decoration-2">
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
            <section className="border border-background-300 rounded-[10px] overflow-hidden">
                <table className="w-full rounded-xl">
                    <thead className="bg-background-200">
                        <tr className="body-t6 text-main *:border-background-300">
                            <th className="w-[25px] py-2 border-r border-b"></th>
                            <th className="w-[45px] py-2 border-r border-b">
                                이름
                            </th>
                            <th className="w-[70px] py-2 border-r border-b">
                                학번
                            </th>
                            <th className="w-[110px] py-2 border-r border-b">
                                전공
                            </th>
                            <th className="py-2 border-b">상태</th>
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
                                    className="hover:bg-stroke text-center body-t6 *:border-background-300 not-last:border-b not-last:border-background-300"
                                >
                                    <td className="py-2 border-r">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(m.sno)}
                                            onChange={() => toggleSelect(m.sno)}
                                        />
                                    </td>

                                    <td className="py-2 border-r">{m.name}</td>

                                    <td className="py-2 border-r">{m.sno}</td>

                                    <td className="py-2 border-r">{m.dept}</td>
                                    <td className="py-2">
                                        <select
                                            className="border w-11 h-4 border-background-200 rounded-[5px] px-1 body-t7 bg-background-100 appearance-none"
                                            onChange={(e) => {
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
                <FormButton text="선택삭제" isLoading={isLoading} />
            </form>
        </div>
    );
}
