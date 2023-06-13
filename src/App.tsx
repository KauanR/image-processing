import { CssBaseline, ThemeProvider } from '@mui/material'
import customTheme from './constant/custom-theme'
import { Controller } from './components/Controller'
import { useState } from 'react'
import { Images } from './constant/types/images'
import './App.scss'

function App() {
    const [images, setImages] = useState<Images | null>(null)

    return (
        <ThemeProvider theme={customTheme}>
            <Controller onSubmit={newImages => setImages(newImages)}/>

            <CssBaseline/>
        </ThemeProvider>
    )
}

export default App
