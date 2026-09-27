import { Routes, Route } from 'react-router-dom'

// Layout
// import Header from './components/layout/Header'
// import Footer from './components/layout/Footer'

// Pages
// import Home from './pages/Home'
// import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> 
      <main className="flex-1">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route
            path="/"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <p className="text-[var(--color-text-muted)] text-lg">
                  FaceTask — ready to build
                </p>
              </div>
            }
          />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default App
