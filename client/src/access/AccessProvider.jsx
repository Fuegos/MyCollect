import { useSelector } from "react-redux"
import { ADMIN, GRANT_COLLECTION, GRANT_ITEM } from "./accessTypes"

export default function AccessProvider({
    component: Component,
    item,
    collection,
    items
}) {
    const isAdmin = useSelector(state => state.authUser.isAdmin)
    const userId = useSelector(state => state.authUser._id)
    
    if(isAdmin 
        || collection && collection.owner._id === userId
        || item && (item.collectionRef.owner._id === userId || item.owner._id === userId)   
        || items && (items.every(item => item.collectionRef.owner._id === userId || item.owner._id === userId))    
    ) {
        return (
            <Component />
        )
    }

    return null
}