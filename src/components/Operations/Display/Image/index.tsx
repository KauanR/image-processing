import { Card, CardContent, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import './styles.scss'

type Props = {
    title: string
    image: ImageData
}

export const OperationsDisplayImage = ({ 
    title,
    image
}: Props) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        canvasRef.current?.getContext('2d')?.putImageData(image, 0, 0)
    }, [])

    return (
        <Card variant='outlined' className='display-image'>
            <CardContent>
                <Typography variant='body1'>
                    { title }
                </Typography>

                <canvas ref={canvasRef} width='250' height='285'></canvas>       
            </CardContent>
        </Card>
    )
}