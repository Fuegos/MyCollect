import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import PageSuccess from './PageSuccess';
import AuthPage from './authUser/container/AuthPage'
import NavigationBar from './components/NavigationBar'
import { IntlProvider } from "react-intl"
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material';
import { langMessages } from './lang/data/dataLangs';


function App() {
    const language = useSelector(state => state.lang.lang)
    const themeMode = useSelector(state => state.themeMode.mode)
    const theme = createTheme({
        palette: {
            mode: themeMode
        }
    })
    
    return (
        <IntlProvider locale={language} messages={langMessages[language]}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <NavigationBar />
                    <Routes>
                        <Route path="auth/*" element={<AuthPage />}/>
                        <Route path="success" element={<PageSuccess />}/>
                        <Route path="*" element={<Navigate replace to="auth/sign/in" />}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </IntlProvider>
    )
}

export default App;
