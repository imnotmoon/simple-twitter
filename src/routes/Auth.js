import React, { useState } from 'react'
import { authService, firebaseInstance } from '../fbInstance'


// Router에 따라 로그인된 상태라면 여기 안들어온다
function Auth() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("")

    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        console.log({ email, password })
        try {
            let data
            if (newAccount) {
                // 항상 초기값은 새 계정
                data = await authService.createUserWithEmailAndPassword(email, password)
                setNewAccount(false)
            } else {
                data = await authService.signInWithEmailAndPassword(email, password)
            }
            console.log(data)
        } catch (error) {
            console.log(error.message);
            setError(error.message)
        }
    }

    const toggleAccount = () => {
        setNewAccount((prev) => !prev)
    }

    const onSocialClick = async (event) => {
        event.preventDefault()
        const { target: { name } } = event;

        let provider;
        if (name === "Google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        } else if (name === "Github") {
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }

        await authService.signInWithPopup(provider)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange} />
                <input
                    name="password"
                    type="text"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Create Account" : "Sign In"}</span>
            <div>
                <button name="Google" onClick={onSocialClick}>Continue with Google</button>
                <button name="Github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth
