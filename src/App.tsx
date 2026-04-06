import { HashRouter, Route, Routes } from "react-router"
import ErrorBoundary from "./components/ErrorBoundary"
import CV from "./views/CV"

function App() {
  return (
    <HashRouter>
      <ErrorBoundary>
        <Routes>
          <Route index element={<CV />} />
        </Routes>
      </ErrorBoundary>
    </HashRouter>
  )
}

export default App
