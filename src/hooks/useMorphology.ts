const useMorphology = () => {

    const erosion = (image: ImageData, kernel: number[]) => {
        const { width, height, data } = image

        const result = new Uint8ClampedArray(data.length)

        const kernelSize = kernel.length
        const halfKernel = Math.floor(kernelSize / 2)

        for(let y = halfKernel; y < height - halfKernel; y++) {
            for(let x = halfKernel; x < width - halfKernel; x++) {
                let allBlack = true
                let kernelIndex = 0

                for (let ky = -halfKernel; ky <= halfKernel; ky++)  {
                    for (let kx = -halfKernel; kx <= halfKernel; kx++) {
                        const index = ((y + ky) * width + (x + kx)) * 4
                        const pixel = data[index]
                        const kernelPixel = kernel[kernelIndex++]

                        if (kernelPixel === 1 && pixel !== 0) {
                            allBlack = false
                            break
                        }
                    }

                    if(!allBlack) {
                        break
                    }
                }

                const outputIndex = (y * width + x) * 4
                for (let i = 0; i < 4; i++) {
                    result[outputIndex + i] = allBlack ? 0 : 255
                }
            }
        }

        return new ImageData(result, width, height)
    }

    const dilation = (image: ImageData, kernel: number[]) => {
       
    }

    const opening = () => {

    }

    const closing = () => {

    }

    const edge = () => {

    }

    return {
        erosion,
        opening,
        closing,
        edge
    }
}

export default useMorphology