import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { addSelectedUser, removeSelectedUser } from '../redux/adminSlice'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import dateFormat, { masks } from 'dateformat'


export default function User(props) {
    const { control, watch } = useForm()
    const dispatch = useDispatch()

    const user = props.user
    const isChecked = useSelector(state => state.admin.selectedUsers.some(u => u._id === user._id))

    useEffect(() => {
        const subscription = watch(value => {
            if(value['user']) {
                dispatch(addSelectedUser(user))
            } else {
                dispatch(removeSelectedUser(user))
            }
        })
        return () => subscription.unsubscribe()
    }, [watch])

    return (
        <TableRow
            key={user._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell padding="checkbox">
                <Controller 
                    name={`user`}
                    control={control}
                    render={({field}) => 
                        <Checkbox
                            {...field}
                            color="primary"
                            checked={isChecked}
                        /> 
                    }
                />
            </TableCell>
            <TableCell component="th" scope="row">
                {user._id}
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{dateFormat(user.dateLogin, "dd mmmm yyyy HH:MM")}</TableCell>
            <TableCell>{dateFormat(user.dateRegistration, "dd mmmm yyyy HH:MM")}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>{user.role}</TableCell>
        </TableRow>
    )
}