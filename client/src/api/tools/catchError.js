import { addError } from "../../components/errors/redux/errorsSlice"
import { ObjectID } from 'bson'

export default async function (thunkAPI, performFunction) {
    try {
        return await performFunction()
    } catch(e) {
        thunkAPI.dispatch(addError({
            _id: new ObjectID().toString(),
            type: e.response.data.type
        }))
        return thunkAPI.rejectWithValue()
    }
}