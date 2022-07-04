import React from 'react'
import io from 'socket.io-client'

const SERVER = process.env.REACT_APP_SERVER || "/"

export const socket = io.connect(SERVER)
export const SocketContext = React.createContext()