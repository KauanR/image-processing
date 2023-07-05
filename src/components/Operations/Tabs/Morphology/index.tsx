import { TabPanel } from '@mui/lab'
import { Button } from '@mui/material'
import { useState } from 'react'
import { Images, Result } from 'src/constants/types'
import useMorphology from 'src/hooks/useMorphology'
import { TabMorphologyKernel } from './Kernel'
import './styles.scss'

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
    const { erosion, dilation } = useMorphology()

    const [kernelSize, setKernelSize] = useState<number>(3)
    const [kernel, setKernel] = useState<number[]>([
        0, 1, 0,
        1, 1, 1,
        0, 1, 0
    ])

    const toErosion = () => {
        updateResult({
            description: 'Operações Morfológicas: Erosão',
            value: erosion(image, kernel)
        })
    }

    const toDilatation = () => {
        updateResult({
            description: 'Operações Morfológicas: Dilatação',
            value: dilation(image, kernel)
        })
    }

    return (
        <TabPanel id='morphology' value={tabValue}>
            <TabMorphologyKernel
                kernel={kernel}
                setKernel={setKernel}
                kernelSize={kernelSize}
                setKernelSize={setKernelSize}
            />

            <div id='buttons'>
                <Button 
                    variant='outlined' 
                    onClick={toErosion}
                >
                    Erosão
                </Button>

                <Button 
                    variant='outlined' 
                    onClick={toDilatation}
                >
                    Dilatação
                </Button>
            </div>
        </TabPanel>
    )

}