import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './components/context/auth.jsx'
import { ItemsContextProvider } from './components/context/item.jsx'
import { WishlistProvider } from './components/context/wishlist.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ItemsContextProvider>
        <AuthProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </AuthProvider>
      </ItemsContextProvider>
    </BrowserRouter>
  </StrictMode>
)
