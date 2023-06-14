import { TabPanel } from '@mui/lab'
import { Button } from '@mui/material'
import { Images, Result } from 'src/constants/types'
import './styles.scss'

type Props = {
    images: Images
    tabValue: string
    updateResult: (value: Result) => void
}

export const TabConversions = ({
    images,
    tabValue,
    updateResult
}: Props) => {

    const { one: imageOne } = images

    const toGrayScale = () => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)
    
        for(let i = 0; i < result.data.length; i += 4) {
            const formula = 0.2989 * result.data[i] + 0.5870 * result.data[i + 1] + 0.1140 *  result.data[i + 2]
            result.data[i] = formula
            result.data[i + 1] = formula
            result.data[i + 2] = formula
        }

        updateResult({
            description: 'Conversões: RGB → Escala de Cinza',
            value: result
        })
    }

    const toBinary = () => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            if(result.data[i] && result.data[i + 1] && result.data[i + 2] <= 127) {
                result.data[i] = 0
                result.data[i + 1] = 0
                result.data[i + 2] = 0
            } else {
                result.data[i] = 255
                result.data[i + 1] = 255
                result.data[i + 2] = 255
            }
        }
    
        updateResult({
            description: 'Conversões: RGB → Binária',
            value: result
        })
    }

    const toNegative = () => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] = 255 - result.data[i]
            result.data[i + 1] = 255 - result.data[i + 1]
            result.data[i + 2] = 255 - result.data[i + 2]
        }

        updateResult({
            description: 'Conversões: RGB → Negativo',
            value: result
        })
    }

    return (
        <TabPanel id='conversions' value={tabValue}>
            <Button 
                variant='contained' 
                onClick={toGrayScale}
            >
                RGB → Escala de Cinza
            </Button>

            <Button 
                variant='contained' 
                onClick={toBinary}
            >
                RGB → Binária
            </Button>

            <Button 
                variant='contained' 
                onClick={toNegative}
            >
                Negativo
            </Button>
        </TabPanel>
    )
}