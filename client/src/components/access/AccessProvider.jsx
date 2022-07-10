import { useSelector } from "react-redux"


export default function AccessProvider({
    component: Component,
    item,
    collection,
    items
}) {
    const isAdmin = useSelector(state => state.authUsers.isAdmin)
    const userId = useSelector(state => state.authUsers._id)
    
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