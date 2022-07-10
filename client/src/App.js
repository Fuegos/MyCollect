import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import AuthPage from './authUser/container/AuthPage'
import NavigationBar from './components/NavigationBar'
import { IntlProvider } from "react-intl"
import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { langMessages } from './lang/data/dataLangs'
import AdminPage from './admin/container/AdminPage'
import { useEffect } from "react"
import { checkTokenUserAsync } from "./authUser/redux/authUserSlice"
import CollectionsPage from './collections/container/CollectionsPage'
import HomePage from './home/container/HomePage'
import ItemsPage from './items/container/ItemsPage'
import ItemPage from './items/container/ItemPage'
import HandlerErrors from './error/HandlerErrors'
import AccessProvider from './access/AccessProvider'
import DialogSearch from './search/components/DialogSearch'


function App() {
    const language = useSelector(state => state.lang.lang)
    const themeMode = useSelector(state => state.themeMode.mode)
    const theme = createTheme({
        palette: {
            mode: themeMode
        }
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkTokenUserAsync())
    }, [])
    
    return (
        <IntlProvider locale={language} messages={langMessages[language]}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <NavigationBar />
                    <DialogSearch />
                    <Routes>
                        <Route path="auth/*" element={<AuthPage />}/>
                        <Route path="home" element={<HomePage />}/>
                        <Route path="admin" element={
                            <AccessProvider component={
                                () => <AdminPage />
                            } /> 
                        }/>
                        <Route path="collections" element={<CollectionsPage />}/>
                        <Route path="collection/:collectionShortId" element={<ItemsPage />} />
                        <Route path="item/:itemShortId" element={<ItemPage />} />
                        <Route path="*" element={<Navigate replace to="home" />}/>
                    </Routes>
                    <HandlerErrors />
                </BrowserRouter>
            </ThemeProvider>
        </IntlProvider>
    )
}

export default App;
