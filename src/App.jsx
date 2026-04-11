import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Resources from './pages/Resources'
import Updates from './pages/Updates'
import Social from './pages/Social'
import About from './pages/About'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/social" element={<Social />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
