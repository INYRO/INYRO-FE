/**
 * 사용자 인증과 관련된 폼 데이터 검증 스키마를 모아둔 파일입니다.
 * Zod 라이브러리를 사용하여 사용자 입력값의 유효성을 검사하며,
 * 검사를 통과한 데이터의 TS 타입을 자동 추론(z.infer)하여 제공합니다.
 *
 * 중복 코드를 방지하기 위해 baseAuthSchema를 만들어 학번(sno)과 비밀번호(password)의 공통 검증 로직을 묶었습니다.
 * 로그인, 회원가입, 비밀번호 찾기 등은 이 베이스 스키마를 재사용(확장)하여 관리합니다.
 *
 * changePasswordSchema는 새 비밀번호와 비밀번호 확인 값이 서로 일치하는지(.refine)를 추가로 검증합니다.
 */

import z from "zod";
import { passwordValidation, snoValidation } from "./authValidators";

// 공통 베이스 스키마
const baseAuthSchema = z.object({
    sno: snoValidation,
    password: passwordValidation,
});

// 로그인 스키마
export const loginSchema = baseAuthSchema;
export type LoginType = z.infer<typeof loginSchema>;

// 비밀번호 찾기 스키마
export const findPasswordSchema = baseAuthSchema;
export type FindPasswordType = z.infer<typeof findPasswordSchema>;

// 비밀번호 변경 스키마
export const changePasswordSchema = z
    .object({
        newPassword: passwordValidation,
        newPasswordConfirmation: z.string(),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["newPasswordConfirmation"],
    });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;

// 회원가입 스키마
export const registerSchema = baseAuthSchema;
export type RegisterType = z.infer<typeof registerSchema>;

// 회원가입 완료 스키마
export const registerCompleteSchema = baseAuthSchema;
export type RegisterCompleteType = z.infer<typeof registerCompleteSchema>;
