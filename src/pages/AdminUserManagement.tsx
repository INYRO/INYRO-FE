import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import MainLogo from "@/components/common/logo/mainLogo";
import sortIcon from "@/assets/icons/lsicon_sort-filter-filled.svg";

type MemberStatus = "ENROLLED" | "LEAVE" | "WITHDRAWN";

interface Member {
    id: number;
    sno: string;
    name: string;
    dept: string;
    status: MemberStatus;
}

interface MemberPageResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        content: Member[];
        pageNumber: number;
        pageSize: number;
        totalElements: number;
        totalPages: number;
        last: boolean;
    };
}

export default function AdminUserManagement() {
    const [members, setMembers] = useState<Member[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [sortType, setSortType] = useState("NAME");
    const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMembers = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await axiosInstance.get<MemberPageResponse>(
                "/admin/members",
                {
                    params: { sortType, order, page, size: 15 },
                }
            );

            if (res.data.isSuccess) {
                setMembers(res.data.result.content);
                setLastPage(res.data.result.last);
            }
        } finally {
            setIsLoading(false);
        }
    }, [sortType, order, page]);

    const toggleSelect = useCallback((sno: string) => {
        setSelected((prev) =>
            prev.includes(sno) ? prev.filter((v) => v !== sno) : [...prev, sno]
        );
    }, []);

    const deleteSelected = useCallback(async () => {
        if (selected.length === 0) return;

        await axiosInstance.delete("/admin/members/withdrawal", {
            data: { snoList: selected },
        });

        setSelected([]);
        await fetchMembers();
    }, [selected, fetchMembers]);

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

    const toggleOrder = useCallback(() => {
        setOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
        setPage(0);
    }, []);

    useEffect(() => {
        void fetchMembers();
    }, [fetchMembers]);

    return (
        <div className="v-stack w-full gap-6">
            <MainLogo />

            <div className="flex items-center justify-between">
                <h2 className="inline-block body-t2 font-bold text-main underline underline-offset-[6px]">
                    유저 리스트
                </h2>

                <div className="flex items-center gap-2 body-t6 text-background-300">
                    <span>정렬</span>

                    <select
                        className="border border-background-200 rounded-[5px] px-2 py-1 body-t6 bg-background-100"
                        value={sortType}
                        onChange={(e) => {
                            setSortType(e.target.value);
                            setPage(0);
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
                            }`}
                        />
                    </button>
                </div>
            </div>

            <div className="border border-background-200 rounded-[10px] bg-background-100 overflow-hidden">
                <table className="w-full text-center table-fixed border-collapse">
                    <thead className="bg-background-200">
                        <tr className="body-t6 text-main">
                            <th className="w-[44px] px-3 py-2 border-r border-background-200"></th>

                            <th className="w-[64px] px-3 py-2 text-center border-r border-background-200">
                                이름
                            </th>

                            <th className="w-[86px] px-3 py-2 text-center border-r border-background-200">
                                학번
                            </th>

                            <th className="px-3 py-2 text-center border-r border-background-200">
                                전공
                            </th>

                            <th className="w-[76px] px-3 py-2 text-center pr-6">
                                상태
                            </th>
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
                                    <td className="px-3 py-2 text-center border-r border-background-200">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(m.sno)}
                                            onChange={() => toggleSelect(m.sno)}
                                        />
                                    </td>

                                    <td className="px-3 py-2 body-t3 border-r border-background-200">
                                        {m.name}
                                    </td>

                                    <td className="px-3 py-2 body-t3 border-r border-background-200">
                                        {m.sno}
                                    </td>

                                    <td className="px-3 py-2 body-t3 border-r border-background-200">
                                        {m.dept}
                                    </td>

                                    <td className="px-3 py-2 text-center pr-6">
                                        <select
                                            className="border border-background-200 rounded-[5px] px-2 py-[3px] pr-7 body-t6 bg-background-100 mr-2 appearance-none"
                                            value={m.status}
                                            onChange={(e) =>
                                                void updateStatus(
                                                    m.id,
                                                    e.target
                                                        .value as MemberStatus
                                                )
                                            }
                                            style={{
                                                backgroundImage:
                                                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition:
                                                    "right 8px center",
                                                backgroundSize: "12px 12px",
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
            </div>

            <div className="flex justify-between body-t6 text-background-300">
                <button
                    disabled={page === 0}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    className="px-3 py-1 border border-background-200 rounded-[5px] disabled:opacity-40"
                >
                    이전
                </button>
                <button
                    disabled={lastPage}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 border border-background-200 rounded-[5px] disabled:opacity-40"
                >
                    다음
                </button>
            </div>

            <button
                onClick={() => void deleteSelected()}
                disabled={selected.length === 0}
                className="w-full h-[44px] rounded-[10px] bg-accent text-background-100 btn-main disabled:opacity-40"
            >
                선택삭제
            </button>
        </div>
    );
}
