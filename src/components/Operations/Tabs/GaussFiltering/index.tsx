import { TabPanel } from '@mui/lab'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import useGaussFilter from 'src/hooks/useGaussFilter'
import { Images, Result } from 'src/constants/types'
import './styles.scss'

type Props = {
    images: Images
    tabValue: string
    updateResult: (value: Result) => void
}

export const TabGaussFiltering = ({
    images,
    tabValue,
    updateResult
}: Props) => {

    const { one: imageOne } = images

    const [value, setValue] = useState<string>('0')

    const toGuassFilter = () => {
        console.log(parseFloat(value))
        updateResult({
            description: `Filtragem de Gauss(${value})`,
            value: useGaussFilter(imageOne, parseFloat(value))
        })
    }

    return (
        <TabPanel id='gauss-filtering' value={tabValue}>
            <TextField 
                variant='outlined'
                type='number'
                InputProps={{ inputProps: {
                    min: 0,
                    max: 1,
                    step: 0.1
                } }}
                value={value}
                label='Desvio padrão (sigma)'
                onChange={evt => setValue(evt.target.value)}
            />
            <Button 
                variant='contained' 
                disabled={!value}
                onClick={toGuassFilter}
            >
                Filtrar
            </Button>
        </TabPanel>
    )
}