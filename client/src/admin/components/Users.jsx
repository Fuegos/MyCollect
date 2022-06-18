import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addAllSelectedUsers, getUsersAsync, removeAllSelectedUsers } from '../redux/adminSlice';
import User from './User'
import { Controller, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'


export default function Users() {
    const { control, watch } = useForm()
    const dispatch = useDispatch()

    const users = useSelector(state => state.admin.users)
    const numUsers = useSelector(state => state.admin.users.length)
    const numSelectedUsers = useSelector(state => state.admin.selectedUsers.length)
    
    useEffect(() => {
        dispatch(getUsersAsync())
    }, [dispatch])

    useEffect(() => {
        const subscription = watch(value => {
            if(value['users']) {
                dispatch(addAllSelectedUsers())
            } else {
                dispatch(removeAllSelectedUsers())
            }
        })
        return () => subscription.unsubscribe()
    }, [watch])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Controller 
                                name={`users`}
                                control={control}
                                render={({field}) => 
                                    <Checkbox
                                        {...field}
                                        color="primary"
                                        checked={numSelectedUsers > 0 && numSelectedUsers === numUsers}
                                        indeterminate={numSelectedUsers > 0 && numSelectedUsers < numUsers}
                                    /> 
                                }
                            />
                        </TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>
                            <FormattedMessage
                                id="admin.table.header.name"
                                defaultMessage="Name"
                            />
                        </TableCell>
                        <TableCell>
                            <FormattedMessage
                                id="admin.table.header.email"
                                defaultMessage="Email"
                            />
                        </TableCell>
                        <TableCell>
                            <FormattedMessage
                                id="admin.table.header.date.login"
                                defaultMessage="Date Login"
                            />
                        </TableCell>
                        <TableCell>
                            <FormattedMessage
                                id="admin.table.header.date.registration"
                                defaultMessage="Date Registration"
                            />
                        </TableCell>
                        <TableCell>
                            <FormattedMessage
                                id="admin.table.header.status"
                                defaultMessage="Status"
                            />
                        </TableCell>
                        <TableCell>
                            <FormattedMessage
                                id="admin.table.header.role"
                                defaultMessage="Role"
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <User key={user._id} user={user} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}