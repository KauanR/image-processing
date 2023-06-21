import { TabPanel } from '@mui/lab'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { Images, Result } from 'src/constants/types'
import useArithmeticOps from 'src/hooks/useArithmeticOps'
import './styles.scss'

type Props = {
    tabValue: string
    images: Images
    updateResult: (value: Result) => void
}

export const TabArithmeticOps = ({
    tabValue,
    images,
    updateResult
}: Props) => {

    const { one: imageOne, two: imageTwo } = images
    const { add, subtract, multiply, divide, blend } = useArithmeticOps()

    const [blendingVal, setBlendingVal] = useState<number>(0)

    const toAdd = () => {
        updateResult({
            description: 'Operações Aritméticas: Adição',
            value: add(imageOne, imageTwo)
        })
    }

    const toSubtract = () => {
        updateResult({
            description: 'Operações Aritméticas: Subtração',
            value: subtract(imageOne, imageTwo)
        })
    }

    const toMultiply = () => {
        updateResult({
            description: 'Operações Aritméticas: Multiplicação',
            value: multiply(imageOne, imageTwo)
        })
    }

    const toDivide = () => {
        updateResult({
            description: 'Operações Aritméticas: Divisão',
            value: multiply(imageOne, imageTwo)
        })
    }

    const toBlend = () => {
        updateResult({
            description: `Operações Aritméticas: Blending(${blendingVal})`,
            value: blend(blendingVal, imageOne, imageTwo)
        })
    }

    return (
        <TabPanel id='arithmetic-ops' value={tabValue}>
            <Button 
                variant='contained' 
                disabled={!images.two} 
                onClick={toAdd}
            >
                Adição
            </Button>
            
            <Button 
                variant='contained' 
                disabled={!images.two} 
                onClick={toSubtract}
            >
                Subtração
            </Button>

            <Button 
                variant='contained' 
                disabled={!images.two} 
                onClick={toMultiply}
            >
                Multiplicação
            </Button>

            <Button 
                variant='contained' 
                disabled={!images.two} 
                onClick={toDivide}
            >
                Divisão
            </Button>

            <div className='blending'>
                <TextField 
                    variant='outlined'
                    type='number'
                    value={blendingVal}
                    onChange={evt => setBlendingVal(parseInt(evt.target.value))}
                />
                <Button 
                    variant='contained' 
                    disabled={!blendingVal || !images.two} 
                    onClick={toBlend}
                >
                    Blending
                </Button>
            </div>
        </TabPanel>
    )
}