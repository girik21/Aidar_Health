import { Route, Routes } from 'react-router-dom'
import Login from './components/AuthScreen/Login'
import Signup from './components/AuthScreen/SignUp'
import Layout from './components/Layout'
import Landing from './pages/Landing'


function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Layout>
  )
}

export default App
