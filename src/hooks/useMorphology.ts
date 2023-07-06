import useArithmeticOps from './useArithmeticOps'

const useMorphology = () => {

    const { subtract } = useArithmeticOps()

    const erosion = (image: ImageData, kernel: number[]) => {
        const { width, height, data } = image

        const result = new Uint8ClampedArray(data.length)

        const getPixelIndex = (x: number, y: number) => (y * width + x) * 4

        const kernelSize = Math.sqrt(kernel.length)
        const halfKernel = Math.floor(kernelSize / 2)

        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                let allBlack = true

                for (let j = -halfKernel; j <= halfKernel; j++)  {
                    for (let i = -halfKernel; i <= halfKernel; i++) {
                        const kernelIndex = (j + halfKernel) * kernelSize + (i + halfKernel)
                        const kernelValue = kernel[kernelIndex]

                        const sourceX = x + i
                        const sourceY = y + j

                        if(sourceX < 0 || sourceX >= width || sourceY < 0 || sourceY >= height) {
                            allBlack = false
                            break
                        }

                        const sourceIndex = getPixelIndex(sourceX, sourceY)
                        const sourceValue = data[sourceIndex]

                        if(kernelValue === 1 && sourceValue !== 0) {
                            allBlack = false
                            break
                        }
                    }

                    if(!allBlack) break
                }

                const index = getPixelIndex(x, y)
                const value = allBlack ? 0 : 255
    
                result[index] = value
                result[index + 1] = value
                result[index + 2] = value
                result[index + 3] = 255
            }
        }

        return new ImageData(result, width, height)
    }

    const dilation = (image: ImageData, kernel: number[]) => {
        const { width, height, data } = image

        const result = new Uint8ClampedArray(data.length)
        
        const getPixelIndex = (x: number, y: number) => (y * width + x) * 4

        const kernelSize = Math.sqrt(kernel.length)
        const halfKernel = Math.floor(kernelSize / 2)

        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                let anyBlack = false

                for (let j = -halfKernel; j <= halfKernel; j++) {
                    for (let i = -halfKernel; i <= halfKernel; i++) {
                        const kernelIndex = (j + halfKernel) * kernelSize + (i + halfKernel)
                        const kernelValue = kernel[kernelIndex]

                        const sourceX = x + i
                        const sourceY = y + j

                        if(sourceX < 0 || sourceX >= width || sourceY < 0 || sourceY >= height) {
                            continue
                        }

                        const sourceIndex = getPixelIndex(sourceX, sourceY)
                        const sourceValue = data[sourceIndex]

                        if(kernelValue === 1 && sourceValue === 0) {
                            anyBlack = true
                            break
                        }
                    }

                    if(anyBlack) break
                }

                const index = getPixelIndex(x, y)
                const value = anyBlack ? 0 : 255

                result[index] = value
                result[index + 1] = value
                result[index + 2] = value
                result[index + 3] = 255
            }
        }

        return new ImageData(result, width, height)
    }

    const opening = (image: ImageData, kernel: number[]) => {
        return dilation(erosion(image, kernel), kernel)
    }

    const closing = (image: ImageData, kernel: number[]) => {
        return erosion(dilation(image, kernel), kernel)
    }

    const contour = (image: ImageData, kernel: number[]) => {
        return subtract(erosion(image, kernel), image)
    }

    return {
        erosion,
        dilation,
        opening,
        closing,
        contour
    }
}

export default useMorphology