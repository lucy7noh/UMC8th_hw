const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center text-white p-10 bg-opacity-70 rounded-lg shadow-lg">
        <h1 className="text-6xl font-extrabold mb-4 animate__animated animate__fadeIn">404</h1>
        <p className="text-2xl font-semibold mb-6 animate__animated animate__fadeIn animate__delay-1s">
          페이지를 찾을 수 없습니다.
        </p>
        
      </div>
    </div>
  )
}

export default NotFoundPage