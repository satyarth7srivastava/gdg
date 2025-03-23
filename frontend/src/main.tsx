import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router'

import LoginPage from './LoginPaage/page.tsx'
import AdminPage from './AdminPage/page.tsx'
import VoterPage from './VoterPage/page.tsx'
import RegisterUserPage from './RegisterUserPage/page.tsx'




createRoot(document.getElementById('root')!).render(
    <BrowserRouter> 
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/voter" element={<VoterPage />} />
            <Route path="/register" element={<RegisterUserPage />} />
        </Routes>
    </BrowserRouter>
)
