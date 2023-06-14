import { Images } from 'src/constants/types/images'
import { OperationsDisplay } from './Display'
import './styles.scss'

type OperationsProps = {
    images: Images
    goBack: () => void
}

export const Operations = ({ ...props }: OperationsProps) => {

    return (
        <>
            <OperationsDisplay {...props} />
        </>
    )
}