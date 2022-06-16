import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import PageSuccess from './PageSuccess';
import AuthPage from './authUser/container/AuthPage'
import NavigationBar from './components/NavigationBar'
import { IntlProvider } from "react-intl"
import messages_en from "./lang/en.json"
import messages_uk from "./lang/uk.json"
import messages_ge from "./lang/ge.json"
import { useSelector } from 'react-redux';

const messages = {
    'en': messages_en,
    'uk': messages_uk,
    'ge': messages_ge
}


function App() {
    const language = useSelector(state => state.lang.lang)
    
    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <BrowserRouter>
                <NavigationBar />
                <Routes>
                    <Route path="auth/*" element={<AuthPage />}/>
                    <Route path="success" element={<PageSuccess />}/>
                    <Route path="*" element={<Navigate replace to="auth/sign/in" />}/>
                </Routes>
            </BrowserRouter>
        </IntlProvider>
    )
}

export default App;
