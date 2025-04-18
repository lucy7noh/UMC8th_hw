import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: "/", label: "홈" },
  { to: "/movies/popular", label: "현재 상영 중" },
  { to: "/movies/top_rated", label: "평점 높은" },
  { to: "/movies/now_playing", label: "상영 중" },
  { to: "/movies/upcoming", label: "개봉 예정" },
];



export const Navbar = (): Element => {
  return (
    <div className="flex justify-between items-center p-4 bg-black text-white">
      <h1 className="font-montserrat text-2xl font-extrabold text-white">Movie App</h1>
      <div className="flex gap-4">
        {LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? "text-[#b2dab1] font-bold" : "text-gray-400"
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

