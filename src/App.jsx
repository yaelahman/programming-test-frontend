import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense } from 'react'
import './assets/style/App.css'
import Layout from './components/layout/Index'
import { routes } from './routes/Route'
import NotFoundPage from './components/views/errors/404'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div className="App">
      <ToastContainer
        theme="colored"
      />
      <BrowserRouter>
        <Suspense fallback={"Loading..."}>
          <Routes>
            <Route path="/" element={<Layout />}>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  index={route.index}
                  element={<route.main />}
                />
              ))}
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
