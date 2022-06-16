import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import PageSuccess from './PageSuccess';
import AuthPage from './authUser/container/AuthPage'
import NavigationBar from './components/NavigationBar';


function App() {
  return (
    <BrowserRouter>
        <NavigationBar />
        <Routes>
           <Route path="auth/*" element={<AuthPage />}/>
           <Route path="success" element={<PageSuccess />}/>
           <Route path="*" element={<Navigate replace to="auth/sign/in" />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
