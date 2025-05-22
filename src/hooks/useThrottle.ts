// useThrottle: 주어진 값(value)이 자주 변경될 때
// 최소 interval 간격으로만 업데이트해서 성능을 개선한다

import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number = 500): T {
  // 1. 상태 변수: throttledValue
  // 초기값을 전달받은 value로 설정
  const [throttledValue, setThrottledValue] = useState<T>(value);

  // 2. Ref lastExecuted: 마지막으로 실행된 시간을 기록
  // useRef는 컴포넌트가 리렌더링 되어도 값이 유지됨
  const lastExecuted = useRef<number>(Date.now());

  // 3. useEffect: value나 delay가 변경될 때 실행
  useEffect(() => {
    const now = Date.now();

    // 충분한 시간이 지난 경우: 즉시 업데이트
    if (now - lastExecuted.current >= delay) {
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      // 아직 delay가 안 지난 경우: 남은 시간 후에 업데이트
      const remaining = delay - (now - lastExecuted.current);

      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, remaining);

      // cleanup: 이전 타이머 제거 (중복 실행 방지)
      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;
