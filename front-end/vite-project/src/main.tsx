
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx'
import LoginPage from './pages/loginPage/LoginPage.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </Provider>,
)
