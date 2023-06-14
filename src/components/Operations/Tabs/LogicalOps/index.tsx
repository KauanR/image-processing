import { TabPanel } from '@mui/lab'
import { Images, Result } from 'src/constants/types'
import { Button } from '@mui/material'
import './styles.scss'
import { useXOR } from 'src/hooks'

type Props = {
    images: Images
    tabValue: string
    updateResult: (value: Result) => void
}

export const TabLogicalOps = ({
    images,
    tabValue,
    updateResult
}: Props) => {

    const { one: imageOne, two: imageTwo } = images

    const and = () => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] = result.data[i] && (imageTwo?.data[i] || 0)
            result.data[i + 1] = result.data[i + 1] && (imageTwo?.data[i + 1] || 0)
            result.data[i + 2] = result.data[i + 2] && (imageTwo?.data[i + 2] || 0)
        }

        updateResult({
            description: 'Operações Lógicas: AND',
            value: result
        })
    }

    const or = () => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] = result.data[i] || (imageTwo?.data[i] || 0)
            result.data[i + 1] = result.data[i + 1] || (imageTwo?.data[i + 1] || 0)
            result.data[i + 2] = result.data[i + 2] || (imageTwo?.data[i + 2] || 0)
        }

        updateResult({
            description: 'Operações Lógicas: OR',
            value: result
        })
    }

    const xor = () => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] = result.data[i] === imageTwo?.data[i] ? 0 : 255
            result.data[i + 1] = result.data[i + 1] === imageTwo?.data[i + 1] ? 0 : 255
            result.data[i + 2] = result.data[i + 2] === imageTwo?.data[i + 2] ? 0 : 255
        }

        updateResult({
            description: 'Operações Lógicas: XOR',
            value: result
        })
    }

    const not = () => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] = 255 - result.data[i]
            result.data[i + 1] = 255 - result.data[i + 1]
            result.data[i + 2] = 255 - result.data[i + 2]
        }

        updateResult({
            description: 'Operações Lógicas: NOT',
            value: result
        })
    }

    return (
        <TabPanel id='logical-ops' value={tabValue}>
            <Button variant='contained' disabled={!imageTwo} onClick={and}>
                AND
            </Button>
            
            <Button variant='contained' disabled={!imageTwo} onClick={or}>
                OR
            </Button>

            <Button variant='contained' disabled={!imageTwo} onClick={xor}>
                XOR
            </Button>

            <Button variant='contained' onClick={not}>
                NOT
            </Button>
        </TabPanel>
    )
}