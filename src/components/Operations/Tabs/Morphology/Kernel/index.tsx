import { Checkbox, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import SquareIcon from '@mui/icons-material/Square'
import './styles.scss'
import { ChangeEvent } from 'react'

type Props = {
    kernelSize: number
    setKernelSize: (value: number) => void
    kernel: number[]
    setKernel: (value: number[]) => void
}

export const TabMorphologyKernel = ({
    kernelSize,
    setKernelSize,
    kernel,
    setKernel
}: Props) => {

    const kernelSizeChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = Number(event.target.value)
        setKernelSize(value)

        const newKernel: number[] = Array(value * value).fill(0)
        setKernel(newKernel)
    }

    const kernelChange = (index: number, value: boolean) => {
        const newCustomKernel = [...kernel]
        newCustomKernel[index] = Number(value)
        setKernel(newCustomKernel)
    }

    return (
        <div id='kernel'>
            <TextField
                value={kernelSize}
                onChange={kernelSizeChange}
                label='Tamanho do Elemento Estruturante'
                select
            >
                <MenuItem value={3}>3x3</MenuItem>
                <MenuItem value={5}>5x5</MenuItem>
                <MenuItem value={7}>7x7</MenuItem>
            </TextField>

            <div id='custom' className={'size-' + kernelSize}>
                <Typography id='label' variant='subtitle2' align='center' color='text.secondary'>
                    Elemento Estruturante
                </Typography>
                { kernel && kernel.map((item, index) => (
                    <Checkbox
                        key={index}
                        checkedIcon={<SquareIcon/>}
                        checked={!!item}
                        onChange={(_, value) => kernelChange(index, value)}
                    />
                ))}
            </div>
        </div>
    )
}