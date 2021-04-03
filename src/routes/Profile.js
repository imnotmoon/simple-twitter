import React from 'react'
import { authService } from '../fbInstance'

function Profile() {

    const onLogOutclick = () => {
        authService.signOut()
    }

    return (
        <>
            <button onClick={onLogOutclick}>Log Out</button>
        </>
    )
}

export default Profile
