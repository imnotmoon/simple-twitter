import React, { useState, useEffect } from 'react'
import AppRouter from 'components/Router'
import { authService } from '../fbInstance'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  // 렌더링이 파이어베이스 auth 체크보다 빨라서 항상 초기값이 '로그인 안한 상태'
  // onAuthStateChanged() 메소드를 통해서 이벤트 리스너를 달아주고
  // 받아온 로그인 상태에 따라 렌더링을 다시함
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing"}
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  )
}

export default App
