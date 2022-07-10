import { addError } from "../../components/errors/redux/errorsSlice"
import { ObjectID } from 'bson'

export default async function (thunkAPI, performFunction, execIfFulfilled) {
    try {
        const result = await performFunction()
        if(execIfFulfilled) {
            execIfFulfilled()
        }
        return result
    } catch(e) {
        thunkAPI.dispatch(addError({
            _id: new ObjectID().toString(),
            type: e.response.data.type
        }))
        return thunkAPI.rejectWithValue()
    }
}