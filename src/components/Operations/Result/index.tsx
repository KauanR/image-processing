import { Button, Card, CardContent, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import { Result } from 'src/constants/types'
import './styles.scss'

type Props = {
    result?: Result
}

export const OperationsResult = ({ result }: Props) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const downloadRef = useRef<HTMLButtonElement | null>(null)

    const handleDownload = () => {
        const link = document.createElement('a')

        link.download = 'result.png'
        link.href = canvasRef.current?.toDataURL('image/png').replace('image/png', 'image/octet-stream') || ''

        link.click()
    }

    useEffect(() => {
        console.log('cheguei no resultado', result)
        if(result) {
            canvasRef.current?.getContext('2d')?.clearRect(0, 0, 265, 285)
            canvasRef.current?.getContext('2d')?.putImageData(result.value, 0, 0)
        }
    }, [result])

    return (
        <Card variant='outlined' className='operations-result'>
            <CardContent>
                <div className="title">
                    <Typography variant='h6' textAlign='center'>
                        Resultado
                    </Typography>
                    <Typography variant='body2' textAlign='center' color='text.secondary'>
                        { result?.description }
                    </Typography>
                </div>

                <canvas 
                    ref={canvasRef} 
                    width='250' 
                    height='285'
                />

                <Button 
                    ref={downloadRef} 
                    variant='contained' 
                    color='secondary' 
                    onClick={handleDownload}
                >
                    Baixar resultado
                </Button>
            </CardContent>
        </Card>
    )
}