/*
 * Inyro 프론트엔드의 빌드 및 개발 서버 환경을 설정하는 Vite 설정 파일입니다.
 * 플러그인 적용, 절대 경로 매핑, 로컬 개발 시 CORS 에러 우회를 위한 프록시 등을 관리합니다.
 *
 * 프록시는 백엔드에서 api를 호출할 때, 주소에 '/api'를 항상 포함하기 때문에, '/api' 주소를 가로채 백엔드에 요청을 보냅니다.
 * 이는 'https://api.inyro.com/'의 백엔드 주소를 할당시킵니다.
 *
 * 타겟 백엔드 주소는 환경 변수(.env)의 VITE_API_URL 값을 최우선으로 사용합니다.
 */

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
// loadEnv가 mode를 원하기 때문에 동적 셋팅 사용
export default defineConfig(({ mode }) => {
    // vite.config.ts가 불러와지는 시점은 vite 환경이 켜지기 전이기 때문에 .env 파일을 읽지 못함.
    // 따라서, loadEnv 함수를 사용해 '.env'를 수동으로 끌고옴
    // 세 번째 페리메터로 '""'를 작성 시 모든 env 정보를 다 불러옴
    const env = loadEnv(mode, process.cwd(), "");

    return {
        // 프로젝트에 적용할 Vite 플러그인 목록
        plugins: [
            // 기존 Babel 대신 Rust 기반의 빠른 SWC 컴파일러를 사용하여 빌드 및 새로고침(HMR) 속도를 증대
            react(),
            // Tailwind CSS(v4)를 Vite 빌드 과정에 통합함
            tailwindcss(),
        ],
        // 모듈 경로 resolution 설정
        resolve: {
            // alias 설정(절대 경로)
            // 실제 빌드 시 Vite가 '@' 기호를 'src' 폴더의 절대 경로로 인식하게 만듬
            alias: {
                "@": path.resolve(import.meta.dirname, "./src"),
            },
        },
        // 로컬 개발 서버 설정
        server: {
            proxy: {
                // FE에서 '/api'로 시작하는 요청을 보내면, Vite 개발 서버가 이를 가로채어 백엔드로 대신 전달함
                // 이를 통해 브라우저의 CORS 정책을 우회함.
                "/api": {
                    // 백엔드 주소 할당
                    target: env.VITE_API_URL,
                    // HTTP 요청 헤더의 Host 값을 타겟 주소(api.inyro.com)로 변경
                    // 백엔드 서버가 자신의 도메인으로 온 요청이라고 믿게 만듬
                    changeOrigin: true,
                },
            },
        },
    };
});
