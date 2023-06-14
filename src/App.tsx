import { CssBaseline, ThemeProvider } from '@mui/material'
import { Controller } from './components/Controller'
import { useState } from 'react'
import { Images } from './constants/types'
import customTheme from './constants/custom-theme'
import { Operations } from './components/Operations'
import './App.scss'

function App() {

    const [images, setImages] = useState<Images | null>(null)

    const handleImages = (newImages: Images | null) => {
        setImages(newImages)
    }

    return (
        <ThemeProvider theme={customTheme}>
            { !images
                ? <Controller onSubmit={handleImages} />
                : <Operations goBack={() => handleImages(null)} images={images} />
            }

            <CssBaseline/>
        </ThemeProvider>
    )
}

export default App
