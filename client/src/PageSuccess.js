import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function PageSuccess() {
    const name = useSelector(state => state.authUser.name)

    return(
        <h1>Welcome, {name}</h1>
    )
}