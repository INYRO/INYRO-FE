/*
 * Redux Store에 접근하기 위한 Custom Hooks 설정 파일입니다.
 *
 * 기본 useDispatch와 useSelector 대신, 타입이 지정된 이 훅들을 사용합니다.
 * 이를 통해 각 컴포넌트에서 매번 RootState나 AppDispatch 타입을 불러올 필요 없이,
 * 타입 추론과 자동 완성 기능을 사용할 수 있습니다.
 */

import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// 앱 전체에서 'useDispatch' 대신 'useAppDispatch'를 사용
export const useAppDispatch: () => AppDispatch = useDispatch;

// 앱 전체에서 'useSelector' 대신 'useAppSelector'를 사용
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
