import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { OperationsDisplayImage } from './Image'
import { Images } from 'src/constants/types'
import './styles.scss'

type OperationsDisplayProps = {
    images: Images
    goBack: () => void
}

export const OperationsDisplay = ({
    images,
    goBack
}: OperationsDisplayProps) => {
    return (
        <div className='operations-display'>
            <IconButton className='go-back' onClick={goBack}>
                <ArrowBackIcon/>
            </IconButton>

            <div className="images">
                <OperationsDisplayImage
                    title='Imagem Original 1' 
                    image={images.one}
                />

                { images.two && (
                    <OperationsDisplayImage
                        title='Imagem Original 2' 
                        image={images.two}
                    />
                )}
            </div>
        </div>
    )
}