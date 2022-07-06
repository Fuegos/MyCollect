import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import SignUp from '../components/SignUp'
import { useSelector } from 'react-redux'
import SignIn from '../components/SignIn'

export default function AuthPage() {
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.authUser.isAuth)

    useEffect(() => {
        if(isAuth) {
            navigate('../home')
        }
    }, [isAuth])

    return (
        <Routes>
            <Route path='sign/up' element={<SignUp />} />
            <Route path='sign/in' element={<SignIn />} />
            <Route path="*" element={<Navigate replace to="sign/in" />}/>
        </Routes>
    ) 
}