import { TabPanel } from '@mui/lab'
import { Images } from 'src/constants/types'

type Props = {
    images: Images
    tabValue: string
}

export const TabFiltering = ({
    images,
    tabValue
}: Props) => {
    return (
        <TabPanel value={tabValue}>
            Filtragem gaussiana
        </TabPanel>
    )
}