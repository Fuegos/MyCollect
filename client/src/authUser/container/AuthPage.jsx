import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Registration from '../components/Registration'
import { useSelector } from 'react-redux'

export default function AuthPage() {
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.authUser.isAuth)

    useEffect(() => {
        if(isAuth) {
            navigate('../success')
        }
    }, [isAuth])

    return (
        <Routes>
            <Route path='registration' element={<Registration />}/>
        </Routes>
    ) 
}