import React, { useState, useEffect } from 'react'
import AppRouter from 'components/Router'
import { authService } from '../fbInstance'

export const UserContext = React.createContext()

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState({})

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        setIsLoggedIn(true)
        setUserObj(user)
        console.log(userObj)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing"}
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  )
}

export default App


// 렌더링이 파이어베이스 auth 체크보다 빨라서 항상 초기값이 '로그인 안한 상태'
// onAuthStateChanged() 메소드를 통해서 이벤트 리스너를 달아주고
// 받아온 로그인 상태에 따라 렌더링을 다시함