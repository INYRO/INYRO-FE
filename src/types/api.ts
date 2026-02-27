/**
 * Inyro 프로젝트의 모든 API 응답을 위한 공통 TS interface입니다.
 * 백엔드 서버와 약속된 표준 응답 포맷(Common Response)을 정의합니다.
 *
 * 여기서 '@template T'는 응답의 결과물(result)로 들어올 데이터의 타입을 의미합니다.
 * 실 사용 시에 T에 타입을 지정해 사용합니다(예: ApiResponse<ReissueResult>).
 *
 * 해당 interface의 필드는 다음으로 구성되어 있습니다.
 * - isSuccess: API 처리의 성공 여부 (true/false)
 * - code: 서비스 고유 응답 코드 (예: "COMMON200", "AUTH4001")
 * - message: 응답 관련 상세 메시지 (에러 시 사유 등)
 * - result: 실제 반환되는 데이터 알맹이 (제네릭 T를 통해 동적 지정)
 */

export interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}
