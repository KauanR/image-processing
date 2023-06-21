import { TabPanel } from '@mui/lab'
import { Images, Result } from 'src/constants/types'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import useEnhancements from 'src/hooks/useEnhancements'
import './styles.scss'

type Props = {
    images: Images
    tabValue: string
    updateResult: (value: Result) => void
}

export const TabEnhancements = ({
    images,
    tabValue,
    updateResult
}: Props) => {

    const { one: imageOne } = images
    const { max, min, avg, median, order, consSmoothing } = useEnhancements()

    const [orderVal, setOrderVal] = useState<string>('0')

    const toMax = () => {
        updateResult({
            description: 'Realce de Imagens: Máximo',
            value: max(imageOne)
        })
    }

    const toMin = () => {
        updateResult({
            description: 'Realce de Imagens: Mínimo',
            value: min(imageOne)
        })
    }

    const toAvg = () => {
        updateResult({
            description: 'Realce de Imagens: Média',
            value: avg(imageOne)
        })
    }

    const toMedian = () => {
        updateResult({
            description: 'Realce de Imagens: Mediana',
            value: median(imageOne)
        })
    }

    const toOrder = () => {
        updateResult({
            description: `Realce de Imagens: Ordem(${orderVal})`,
            value: order(imageOne, parseInt(orderVal))
        })
    }

    const toConsSmoothing = () => {
        updateResult({
            description: 'Realce de Imagens: Suav. Conservativa',
            value: consSmoothing(imageOne)
        })
    }

    return (
        <TabPanel id='enhancements' value={tabValue}>
            <Button 
                variant='contained' 
                onClick={toMax}
            >
                Máximo
            </Button>

            <Button 
                variant='contained' 
                onClick={toMin}
            >
                Mínimo
            </Button>

            <Button 
                variant='contained' 
                onClick={toAvg}
            >
                Média
            </Button>

            <Button 
                variant='contained' 
                onClick={toMedian}
            >
                Mediana
            </Button>

            <Button 
                variant='contained' 
                id='cons-smoothing'
                onClick={toConsSmoothing}
            >
                Suavização Conservativa
            </Button>

            <div className="order">
                <TextField 
                    variant='outlined'
                    type='number'
                    label='Índice'
                    value={orderVal}
                    InputProps={{ inputProps: {
                        min: 0,
                        max: 8,
                        step: 1
                    } }}
                    onChange={evt => setOrderVal(evt.target.value)}
                />

                <Button
                    variant='contained'
                    disabled={!(parseInt(orderVal) >= 0 && parseInt(orderVal) <= 8)}
                    onClick={toOrder}
                >
                    Ordem
                </Button>
            </div>
        </TabPanel>
    )
}