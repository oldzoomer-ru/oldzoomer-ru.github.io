import { BrowserRouter, Route, Routes } from "react-router"
import ErrorBoundary from "./components/ErrorBoundary"
import Main from "./views/Main"
import CV from "./views/CV"

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route index element={<Main />} />
          <Route path="/cv" element={<CV />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
