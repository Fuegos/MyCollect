import { useSelector } from "react-redux"

export default function PageSuccess() {
    const name = useSelector(state => state.authUser.name)

    return(
        <h1>Welcome, {name}</h1>
    )
}