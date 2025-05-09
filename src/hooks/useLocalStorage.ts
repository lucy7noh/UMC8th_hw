import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      // 저장된 값이 없으면 초기값 반환
      if (item === null) return initialValue;

      // 문자열 또는 null 타입이면 파싱하지 않고 그대로 반환
      if (typeof initialValue === "string" || initialValue === null) {
        return item as unknown as T;
      }

      // 그 외 (객체, 배열 등)은 JSON 파싱
      return JSON.parse(item);
    } catch (error) {
      console.error("로컬스토리지 가져오기 실패:", error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);

      // 문자열이면 그대로 저장, 객체/배열이면 JSON.stringify
      if (typeof value === "string") {
        window.localStorage.setItem(key, value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("로컬스토리지 저장 실패:", error);
    }
  };

  return [storedValue, setValue];
}
