import { BrowserRouter, Route, Routes } from "react-router"
import ErrorBoundary from "./components/ErrorBoundary"
import Main from "./views/Main"

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route index element={<Main />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
