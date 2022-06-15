import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import PageSuccess from './PageSuccess';
import AuthPage from './authUser/container/AuthPage'


function App() {
  return (
    <BrowserRouter>
        <Routes>
           <Route path="auth/*" element={<AuthPage />}/>
           <Route path="success" element={<PageSuccess />}/>
           <Route path="*" element={<Navigate replace to="auth/registration" />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
