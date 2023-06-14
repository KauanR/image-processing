import { Images } from 'src/constants/types/images'
import { OperationsDisplay } from './Display'
import './styles.scss'
import { Tab } from '@mui/material'
import { useState } from 'react'
import { TabContext, TabList } from '@mui/lab'
import { TabTransformations } from './Tabs/Transformations'
import { TabArithmeticOps } from './Tabs/ArithmeticOps'
import { TabLogicalOps } from './Tabs/LogicalOps'
import { TabEnhancements } from './Tabs/Enhancements'
import { TabFiltering } from './Tabs/Filtering'

type OperationsProps = {
    images: Images
    goBack: () => void
}

export const Operations = ({ 
    goBack,
    images
}: OperationsProps) => {

    const [tabsValue, setTabsValue] = useState<string>('0')

    return (
        <>
            <OperationsDisplay goBack={goBack} images={images} />

            <div className='operations'>
                <div className='tabs'>
                    <TabContext value={tabsValue}>
                        <TabList centered onChange={(_, newValue) => setTabsValue(newValue)}>
                            <Tab label='Transformações' value='0' />
                            <Tab label='Op. Aritméticas' value='1' />
                            <Tab label='Op. Lógicas' value='2' />
                            <Tab label='Realce de Images' value='3' />
                            <Tab label='Filtragem Gaussiana' value='4' />
                        </TabList>

                        <TabTransformations tabValue='0' images={images} />
                        <TabArithmeticOps tabValue='1' images={images} />
                        <TabLogicalOps tabValue='2' images={images} />
                        <TabEnhancements tabValue='3' images={images} />
                        <TabFiltering tabValue='4' images={images} />
                    </TabContext>
                </div>

                <div className="result">
                    aaaaaaaaaa
                </div>
            </div>
        </>
    )
}