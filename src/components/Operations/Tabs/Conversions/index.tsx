import { TabPanel } from '@mui/lab'
import { Button } from '@mui/material'
import { Images, Result } from 'src/constants/types'
import useConversions from 'src/hooks/useConversions'
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
    const { grayScale, binary, negative } = useConversions()

    const toGrayScale = () => {
        updateResult({
            description: 'Conversões: RGB → Escala de Cinza',
            value: grayScale(imageOne)
        })
    }

    const toBinary = () => {
        updateResult({
            description: 'Conversões: RGB → Binária',
            value: binary(imageOne)
        })
    }

    const toNegative = () => {
        updateResult({
            description: 'Conversões: RGB → Negativo',
            value: negative(imageOne)
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