import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import {Theme} from "@radix-ui/themes";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StrictMode>
            <Theme>
                <App />
            </Theme>
        </StrictMode>
    </BrowserRouter>
)
