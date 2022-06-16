import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { checkTokenUserAsync } from "./authUser/redux/authUserSlice"

export default function PageSuccess() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const name = useSelector(state => state.authUser.name)
    const isAuth = useSelector(state => state.authUser.isAuth)

    useEffect(() => {
        if(!isAuth) {
            navigate('../auth/sign/in')
        }
    }, [isAuth])

    useEffect(() => {
        dispatch(checkTokenUserAsync())
    }, [])

    return(
        <h1>Welcome, {name}</h1>
    )
}