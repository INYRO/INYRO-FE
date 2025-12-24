import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import MainLogo from "@/components/common/logo/mainLogo";

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
    const [order, setOrder] = useState("ASC");
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMembers = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await axiosInstance.get<MemberPageResponse>(
                "/admin/members",
                {
                    params: {
                        sortType,
                        order,
                        page,
                        size: 15,
                    },
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
                {
                    params: { status },
                }
            );
            await fetchMembers();
        },
        [fetchMembers]
    );

    useEffect(() => {
        void fetchMembers();
    }, [fetchMembers]);

    return (
        <div className="v-stack w-full gap-6">
            <MainLogo />

            <div className="flex items-center justify-between">
                <span className="body-t2 text-primary">유저 리스트</span>
                <div className="flex items-center gap-2 body-t6 text-background-300">
                    <span>정렬</span>
                    <select
                        className="border border-background-200 rounded-[5px] px-2 py-1 body-t6 bg-background-100"
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="NAME">이름</option>
                        <option value="DEPARTMENT">학과</option>
                        <option value="SNO">학번</option>
                    </select>
                    <select
                        className="border border-background-200 rounded-[5px] px-2 py-1 body-t6 bg-background-100"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                    >
                        <option value="ASC">오름차순</option>
                        <option value="DESC">내림차순</option>
                    </select>
                </div>
            </div>

            <div className="border border-background-200 rounded-[10px] bg-background-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-background-200">
                        <tr className="body-t6 text-main">
                            <th className="w-10 px-3 py-2"></th>
                            <th className="px-3 py-2">이름</th>
                            <th className="px-3 py-2">학번</th>
                            <th className="px-3 py-2">전공</th>
                            <th className="px-3 py-2 text-center">상태</th>
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
                                    <td className="px-3 py-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(m.sno)}
                                            onChange={() => toggleSelect(m.sno)}
                                        />
                                    </td>
                                    <td className="px-3 py-2 body-t3">
                                        {m.name}
                                    </td>
                                    <td className="px-3 py-2 body-t3">
                                        {m.sno}
                                    </td>
                                    <td className="px-3 py-2 body-t3">
                                        {m.dept}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <select
                                            className="border border-background-200 rounded-[5px] px-2 py-[3px] body-t6 bg-background-100"
                                            value={m.status}
                                            onChange={(e) =>
                                                void updateStatus(
                                                    m.id,
                                                    e.target
                                                        .value as MemberStatus
                                                )
                                            }
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
