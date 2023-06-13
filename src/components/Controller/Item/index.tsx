import { Button, Card, CardContent, Typography } from '@mui/material'
import { SyntheticEvent, useRef } from 'react'
import { usedrawImageProp } from 'src/hooks'
import './styles.scss'

type ControllerItemProps = {
    id: string
    onChange: (value: ImageData) => void
}

export const ControllerItem = ({ id, onChange }: ControllerItemProps) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const fileChange = (event: SyntheticEvent) => {
        const eventFile = (event.target as HTMLInputElement).files?.item(0) as File

        const context = canvasRef.current?.getContext('2d')

        const image = new Image()
        image.src = URL.createObjectURL(eventFile)

        image.onload = () => {
            canvasRef.current?.setAttribute('width', '250')
            canvasRef.current?.setAttribute('height', '285')
            usedrawImageProp(context, image, 0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0)      
            const imageData = context?.getImageData(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0)
            onChange(imageData as ImageData)
        }

        context?.clearRect(0, 0, 265, 285)
    }

    return (
        <Card variant='outlined' className='item'>
            <CardContent>
                <Typography variant='body1'>
                    Imagem { id }
                </Typography>
                <canvas ref={canvasRef} width='250' height='285'/>

                <input 
                    ref={inputRef}
                    type='file'
                    onChange={fileChange}
                />

                <Button variant='outlined' onClick={() => inputRef.current?.click()}>
                    Carregar Imagem
                </Button>
            </CardContent>
        </Card>
    )
}