/*
 * 서비스의 로고를 렌더링하는 공용 컴포넌트입니다.
 *
 * variant prop을 통해 로고의 크기를 결정합니다.
 * - 'main': 메인 페이지용 (h1, h3 사용)
 * - 'sub': 서브 페이지용 (h2, h4 사용)
 *
 * 기본값은 'main'입니다.
 */

import { Link } from "react-router-dom";

// 타입 정의
// 로고 종류를 타입을 정의
type LogoVariant = "main" | "sub";
// Logo props 타입 정의
interface LogoProps {
    variant?: LogoVariant;
}

export default function Logo({ variant = "main" }: LogoProps) {
    // variant에 따라 렌더링 할 HTML Tag를 동적으로 지정
    // * 컴포넌트기 때문에 첫 글자 대문자로 지정 *
    const TitleTag = variant === "main" ? "h1" : "h2";
    const SubTitleTag = variant === "main" ? "h3" : "h4";

    return (
        <section className="text-center">
            <Link to="/">
                <TitleTag>INYRO</TitleTag>
            </Link>
            <SubTitleTag>IN You, Run Onward</SubTitleTag>
        </section>
    );
}
