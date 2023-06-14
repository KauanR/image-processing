import { TabPanel } from '@mui/lab'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { Images, Result } from 'src/constants/types'
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
    
    const [blendingVal, setBlendingVal] = useState<number>(0)

    const add = () => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] += imageTwo?.data[i] || 0
            result.data[i + 1] += imageTwo?.data[i + 1] || 0
            result.data[i + 2] += imageTwo?.data[i + 2] || 0
            result.data[i + 3] += imageTwo?.data[i + 3] || 0
        }

        updateResult({
            description: 'Operações Aritméticas: Adição',
            value: result
        })
    }

    const subtract = () => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] -= imageTwo?.data[i] || 0
            if(result.data[i] < 0) result.data[i] = 0

            result.data[i + 1] -= imageTwo?.data[i + 1] || 0
            if(result.data[i + 1] < 0) result.data[i + 1] = 0

            result.data[i + 2] -= imageTwo?.data[i + 2] || 0
            if(result.data[i + 2] < 0) result.data[i + 2] = 0
        }

        updateResult({
            description: 'Operações Aritméticas: Subtração',
            value: result
        })
    }

    const multiply = () => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] *= imageTwo?.data[i] || 0
            if(result.data[i] > 255) result.data[i] = 255

            result.data[i + 1] *= imageTwo?.data[i + 1] || 0
            if(result.data[i + 1] > 255) result.data[i + 1] = 255

            result.data[i + 2] *= imageTwo?.data[i + 2] || 0
            if(result.data[i + 2] > 255) result.data[i + 2] = 255

            result.data[i + 3] *= imageTwo?.data[i + 3] || 0
            if(result.data[i + 3] > 255) result.data[i + 3] = 255
        }

        updateResult({
            description: 'Operações Aritméticas: Multiplicação',
            value: result
        })
    }

    const divide = () => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] /= imageTwo?.data[i] || 0
            result.data[i + 1] /= imageTwo?.data[i + 1] || 0
            result.data[i + 2] /= imageTwo?.data[i + 2] || 0
        }

        updateResult({
            description: 'Operações Aritméticas: Divisão',
            value: result
        })
    }

    const blend = () => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] = blendingVal * result.data[i] + (1 - blendingVal) * (imageTwo?.data[i] || 0)
            result.data[i + 1] = blendingVal * result.data[i + 1] + (1 - blendingVal) * (imageTwo?.data[i + 1] || 0)
            result.data[i + 2] = blendingVal * result.data[i + 2] + (1 - blendingVal) * (imageTwo?.data[i + 2] || 0)
        }

        updateResult({
            description: `Operações Aritméticas: Blending(${blendingVal})`,
            value: result
        })
    }

    return (
        <TabPanel id='arithmetic-ops' value={tabValue}>
            <Button 
                variant='contained' 
                disabled={!images.two} 
                onClick={add}
            >
                Adição
            </Button>
            
            <Button 
                variant='contained' 
                disabled={!images.two} 
                onClick={subtract}
            >
                Subtração
            </Button>

            <Button 
                variant='contained' 
                disabled={!images.two} 
                onClick={multiply}
            >
                Multiplicação
            </Button>

            <Button 
                variant='contained' 
                disabled={!images.two} 
                onClick={divide}
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
                    onClick={blend}
                >
                    Blending
                </Button>
            </div>
        </TabPanel>
    )
}