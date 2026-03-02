/*
 * 프로젝트 전반에서 사용되는 공통 유틸리티 함수(날짜 포맷팅 등)를 모아둔 파일입니다.
 * 해당 파일은 다음의 유틸리티 함수들을 제공합니다.
 * - formatToMonthYear은 date 객체를 파라미터로 받아 "YYYY.MM" (예: 2026.02) 형태의 문자열로 변환합니다.
 * - formatDate는 Date 객체를 받아 첫 번째 날짜를 "YYYY-MM-DD" 형태로 변환합니다.
 */

export const formatToMonthYear = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${year}.${month}`;
};

export const formatDate = (d: Date): string => {
    // getMonth()는 0부터 시작하므로 +1 필요, padStart로 두 자리 맞춤
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

// 선택한 마지막 시간에 30분을 더해 찐 종료 시간을 계산하는 도우미 함수
export const calculateEndTime = (startTimeStr: string) => {
    const [h, m] = startTimeStr.split(":").map(Number);
    const dateObj = new Date();
    dateObj.setHours(h, m + 30); // 30분 추가 (자동으로 시간/분 계산됨)
    const endH = String(dateObj.getHours()).padStart(2, "0");
    const endM = String(dateObj.getMinutes()).padStart(2, "0");
    return `${endH}:${endM}`;
};

// 두 Date 객체가 같은 날짜(연, 월, 일)인지 확인해주는 함수입니다.
// 오늘 이전 시각 막아주는 역할을 합니다.
export const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

// 선택한 시간(HH:mm)이 오늘 기준 현재 시간보다 과거인지 확인해주는 함수입니다.
export const isPastTimeSlotToday = (time: string, selectedDate: Date) => {
    // time: "HH:mm"
    const [hh, mm] = time.split(":").map(Number);

    const slot = new Date(selectedDate);
    slot.setHours(hh, mm, 0, 0);

    const now = new Date();

    // 지금보다 이전이면 막기
    return slot < now;
};
