import { Button, Card, CardContent, Typography } from '@mui/material'
import { ControllerItem } from './Item'
import { useState } from 'react'
import { Images } from 'src/constants/types'
import './styles.scss'

type ControllerProps = {
    onSubmit: (images: Images) => void
}

export const Controller = ({
    onSubmit
}: ControllerProps) => {

    const [imageOne, setImageOne] = useState<ImageData | undefined>()
    const [imageTwo, setImageTwo] = useState<ImageData | undefined>()

    return (
        <div className='controller-wrap'>
            <Card className='controller'>
                <CardContent>
                    <div className='title'>
                        <Typography variant='h4'>
                            Processamento de Imagens
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Para iniciar selecione ao menos uma imagem
                        </Typography>
                    </div>

                    <div className='content'>
                        <ControllerItem id='1' onChange={val => setImageOne(val)}/>
                        <ControllerItem id='2' onChange={val => setImageTwo(val)}/>
                    </div>

                    <div className='actions'>
                        <Button 
                            variant='contained' 
                            disabled={!imageOne}
                            onClick={() => onSubmit({ one: imageOne as ImageData, two: imageTwo })}
                        >
                            Começar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}