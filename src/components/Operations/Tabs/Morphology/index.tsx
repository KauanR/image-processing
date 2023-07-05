import { TabPanel } from '@mui/lab'
import { Button } from '@mui/material'
import { Images, Result } from 'src/constants/types'
import useMorphology from 'src/hooks/useMorphology'

type Props = {
    images: Images
    tabValue: string
    updateResult: (value: Result) => void
}

export const TabMorphology = ({
    images,
    tabValue,
    updateResult
}: Props) => {

    const { one: image } = images
    const { erosion } = useMorphology()

    const kernel = [
        0, 0, 1, 0, 0,
        0, 1, 1, 1, 0,
        1, 1, 1, 1, 1,
        0, 1, 1, 1, 0,
        0, 0, 1, 0, 0
    ]

    // const kernel = [
    //     0, 1, 0,
    //     1, 1, 1,
    //     0, 1, 0
    // ]


    const toErosion = () => {
        updateResult({
            description: 'Operações Morfológicas: Erosão',
            value: erosion(image, kernel)
        })
    }

    return (
        <TabPanel id='morphology' value={tabValue}>

            <Button 
                variant='contained' 
                onClick={toErosion}
            >
                Erosão
            </Button>
        </TabPanel>
    )

}