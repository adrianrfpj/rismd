import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRoutes } from './routes'
import { AppThemeProvider } from './context/ThemeContext'

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </AppThemeProvider>
    
  )
}

export default App
