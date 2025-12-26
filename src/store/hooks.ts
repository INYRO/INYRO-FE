import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// 앱 전체에서 'useDispatch' 대신 'useAppDispatch'를 사용
export const useAppDispatch: () => AppDispatch = useDispatch;

// 앱 전체에서 'useSelector' 대신 'useAppSelector'를 사용
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
