import { BrowserRouter, Route, Routes } from "react-router"
import Main from "./views/Main"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
