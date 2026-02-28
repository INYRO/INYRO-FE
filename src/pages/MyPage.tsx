/**
 * 유저의 정보를 확인할 수 있는 마이페이지입니다.
 *
 * 주요 로직 플로우는 다음과 같습니다.
 * - Redux에서 로그인된 유저 정보(학번, 이름, 학과)를 가져와 렌더링합니다.
 * - 페이지 마운트 시 getMyReservationsApi를 호출하여 예약 내역을 불러옵니다.
 * - 예약 변경/취소 모달에서 작업이 완료되면(isChangeCompleted), 목록을 다시 불러와 동기화합니다.
 */

import { getMyReservationsApi } from "@/api/reservationApi";
import Logo from "@/components/common/logo/Logo";
import AccountActions from "@/components/mypage/AccountActions";
import ReservationTable from "@/components/mypage/ReservationTable";
import UserInfo from "@/components/mypage/UserInfo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetChangeSuccess } from "@/store/modalSlice";
import type { Reservation } from "@/types/reservation";
import { useEffect, useState } from "react";

export default function MyPage() {
    // 로딩, 예약 배열 변수
    const [isLoading, setIsLoading] = useState(false);
    const [reservations, setReservations] = useState<Reservation[]>([]);

    // redux 선언 및 user 데이터 저장
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.authState.user);
    const { isChangeCompleted } = useAppSelector((state) => state.modal);

    // 학번, 이름, 학과 변수 선언
    const sno = user?.sno ?? "";
    const name = user?.name ?? "";
    const dept = user?.dept ?? "";

    // 예약정보 불러오는 함수
    const getReservations = async () => {
        setIsLoading(true);
        try {
            const result = await getMyReservationsApi();
            if (!result.isSuccess) {
                console.warn("예약 목록 불러오기 실패");
                return;
            }
            setReservations(result.result.content);
        } catch (err) {
            console.warn("서버 에러로 예약 목록 불러오기 실패", err);
        } finally {
            setIsLoading(false);
        }
    };

    // 페이지 입장시 예약정보를 불러옴
    useEffect(() => {
        void getReservations();
    }, []);

    // 예약에 변경사항 있을시 예약 정보 갱신
    useEffect(() => {
        if (isChangeCompleted) {
            void getReservations().then(() => {
                dispatch(resetChangeSuccess());
            });
        }
    }, [isChangeCompleted, dispatch]);

    return (
        <div className="v-stack w-full">
            <div className="mb-11">
                <Logo />
            </div>
            <div className="flex flex-col gap-[30px]">
                <UserInfo name={name} sno={sno} dept={dept} />
                <ReservationTable
                    isLoading={isLoading}
                    reservations={reservations}
                />
                <AccountActions />
            </div>
        </div>
    );
}
