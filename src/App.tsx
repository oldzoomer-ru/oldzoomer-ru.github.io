import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter, Route, Routes } from "react-router"
import Main from "./views/Main"

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Main />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
