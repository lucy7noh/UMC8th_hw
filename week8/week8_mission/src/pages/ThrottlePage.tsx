import { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  // throttle 대상 값 지정
  const throttledScrollY = useThrottle(scrollY, 2000); // 2초에 한 번만 반영

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log("🔥 throttled scrollY:", throttledScrollY);
  }, [throttledScrollY]);

  return (
    <div style={{ height: "2000px" }} className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Throttle이란?</h1>
      <p>2초에 한 번씩만 scrollY 값이 업데이트됩니다.</p>
      <p>throttled scrollY: {throttledScrollY.toFixed(0)} px</p>
    </div>
  );
};

export default ThrottlePage;
