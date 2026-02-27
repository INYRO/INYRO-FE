/**
 * 동아리방 예역과 관련된 폼 데이터 검증 스키마를 모아둔 파일입니다.
 * Zod 라이브러리와 정규식을 사용하여 검증 로직을 한 곳에서 중앙 관리합니다.
 *
 * 주요 유효성 검사 규칙은 다음과 같습니다.
 * - changeReservationSchema 통해 예약자 명단과 사용 목적을 관리합니다.
 */

import z from "zod";

export const changeReservationSchema = z.object({
    participantList: z.string().min(1, "예약자 명단을 입력해주세요."),
    purpose: z.string().min(1, "사용 목적을 입력해주세요."),
});

export type ChangeReservationType = z.infer<typeof changeReservationSchema>;
