import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider'
import { ContentProvider } from './context/ContentProvider'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Resources from './pages/Resources'
import Updates from './pages/Updates'
import Social from './pages/Social'
import About from './pages/About'
import Admission from './pages/Admission'
import AdminLogin from './pages/admin/AdminLogin'
import AdminPanel from './pages/admin/AdminPanel'
import { getAdminToken } from './api'

function RequireAdmin({ children }) {
  if (!getAdminToken()) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

export default function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminPanel />
                </RequireAdmin>
              }
            />
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/social" element={<Social />} />
              <Route path="/about" element={<About />} />
              <Route path="/admission" element={<Admission />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </ThemeProvider>
  )
}
