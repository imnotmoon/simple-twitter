import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Navigation from './Navigation'
import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Profile from '../routes/Profile'

const AppRouter = ({ isLoggedIn, userObj }) => {

    // prop isLoggedIn : 비동기로 로그인 상황을 받아와서 다른 화면을 렌더링
    return (
        <Router>
            { isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ?
                    (<>
                        {/* 로그인된 상태라면 Home으로 */}
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>

                    </>) :
                    (
                        <>
                            {/* 로그인되지 않은 상태라면 Auth로 */}
                            <Route exact path="/">
                                <Auth />
                            </Route>
                            <Redirect from="*" to="/" />
                        </>
                    )}
            </Switch>
        </Router>
    )
}


export default AppRouter