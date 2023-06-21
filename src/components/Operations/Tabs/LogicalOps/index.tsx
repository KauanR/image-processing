import { TabPanel } from '@mui/lab'
import { Button } from '@mui/material'
import { Images, Result } from 'src/constants/types'
import useLogicalOps from 'src/hooks/useLogicalOps'
import './styles.scss'

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
    const { and, or, xor, not } = useLogicalOps()

    const toAnd = () => {
        updateResult({
            description: 'Operações Lógicas: AND',
            value: and(imageOne, imageTwo)
        })
    }

    const toOr = () => {
        updateResult({
            description: 'Operações Lógicas: OR',
            value: or(imageOne, imageTwo)
        })
    }

    const toXor = () => {
        updateResult({
            description: 'Operações Lógicas: XOR',
            value: xor(imageOne, imageTwo)
        })
    }

    const toNot = () => {
        updateResult({
            description: 'Operações Lógicas: NOT',
            value: not(imageOne, imageTwo)
        })
    }

    return (
        <TabPanel id='logical-ops' value={tabValue}>
            <Button 
                variant='contained' 
                disabled={!imageTwo} 
                onClick={toAnd}
            >
                AND
            </Button>
            
            <Button 
                variant='contained' 
                disabled={!imageTwo} 
                onClick={toOr}
            >
                OR
            </Button>

            <Button 
                variant='contained' 
                disabled={!imageTwo} 
                onClick={toXor}
            >
                XOR
            </Button>

            <Button 
                variant='contained' 
                onClick={toNot}
            >
                NOT
            </Button>
        </TabPanel>
    )
}