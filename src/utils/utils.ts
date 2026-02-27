/*
 * 프로젝트 전반에서 사용되는 공통 유틸리티 함수(날짜 포맷팅 등)를 모아둔 파일입니다.
 * 해당 파일은 다음의 유틸리티 함수들을 제공합니다.
 * - formatToMonthYear은 date 객체를 파라미터로 받아 "YYYY.MM" (예: 2026.02) 형태의 문자열로 변환합니다.
 * - formatDate는 날짜 배열을 받아 첫 번째 날짜를 "YYYY-MM-DD" 형태로 변환합니다.
 */

export const formatToMonthYear = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${year}.${month}`;
};

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

export const formatDate = (value: SelectedDate): string | null => {
    const d = Array.isArray(value) ? value[0] : value;
    if (!d) return null;

    const year = d.getFullYear();
    // getMonth()는 0부터 시작하므로 +1 필요, padStart로 두 자리 맞춤
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};
