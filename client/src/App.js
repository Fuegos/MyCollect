import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import AuthPage from './modules/authUsers/pages/AuthPage'
import NavigationBar from './components/NavigationBar'
import { IntlProvider } from "react-intl"
import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { langMessages } from './components/langs/data/dataLangs'
import AdminPage from './modules/admin/pages/AdminPage'
import { useEffect } from "react"
import { checkTokenUserAsync } from "./modules/authUsers/redux/authUsersSlice"
import CollectionsPage from './modules/collections/pages/CollectionsPage'
import HomePage from './modules/home/pages/HomePage'
import ItemsPage from './modules/items/pages/ItemsPage'
import ItemPage from './modules/items/pages/ItemPage'
import HandlerErrors from './components/errors/HandlerErrors'
import AccessProvider from './components/access/AccessProvider'
import DialogSearch from './components/search/DialogSearch'


function App() {
    const language = useSelector(state => state.langs.lang)
    const themeMode = useSelector(state => state.themes.mode)
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
