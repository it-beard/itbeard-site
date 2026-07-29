import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LangProvider } from './lib/LangContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import TimelinePage from './pages/TimelinePage'
import Archive from './pages/Archive'
import Support from './pages/Support'
import Contacts from './pages/Contacts'
import NotFound from './pages/NotFound'
import Redirector from './pages/Redirector'
import { MEDIAKIT_URL } from './data/site'

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<TimelinePage name="experience" />} />
            <Route path="/about" element={<TimelinePage name="about" />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/support" element={<Support />} />
            <Route path="/sponsorship" element={<Support />} />
            <Route path="/help" element={<Support />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/beard-news" element={<Navigate to="/archive" replace />} />
            <Route path="/mediakit" element={<Redirector to={MEDIAKIT_URL} />} />
            <Route path="/s/:key" element={<Redirector />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LangProvider>
  )
}
