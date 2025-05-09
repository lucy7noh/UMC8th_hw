// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // 여기에 경로 빠지면 클래스 적용 안 됩니다!!
  ],
};
