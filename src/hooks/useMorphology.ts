const useMorphology = () => {

    const erosion = (image: ImageData, kernel: number[]) => {
        const { width, height, data } = image

        const result = new Uint8ClampedArray(data.length)

        const kernelSize = kernel.length
        const halfKernel = Math.floor(kernelSize / 2)

        for(let y = halfKernel; y < height - halfKernel; y++) {
            for(let x = halfKernel; x < width - halfKernel; x++) {
                // controla o FITS
                // FITS = Todos os pixels 1 no elemento estruturante cobrem uma área na imagem também com valores 1
                let allBlack = true

                let kernelIndex = 0

                for (let ky = -halfKernel; ky <= halfKernel; ky++)  {
                    for (let kx = -halfKernel; kx <= halfKernel; kx++) {
                        const index = ((y + ky) * width + (x + kx)) * 4
                        const pixel = data[index]
                        const kernelPixel = kernel[kernelIndex++]

                        // Se bateu o FITS quebra toda a iteração
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
        const { width, height, data } = image

        const result = new Uint8ClampedArray(data.length)

        const kernelSize = kernel.length
        const halfKernel = Math.floor(kernelSize / 2)

        for(let y = halfKernel; y < height - halfKernel; y++) {
            for(let x = halfKernel; x < width - halfKernel; x++) {
                // controla o HITS
                // HITS = Qualquer pixel 1 do elemento estruturante cobre um elemento 1 da imagem
                let anyWhite = false
    
                let kernelIndex = 0

                for (let ky = -halfKernel; ky <= halfKernel; ky++)  {
                    for (let kx = -halfKernel; kx <= halfKernel; kx++) {
                        const index = ((y + ky) * width + (x + kx)) * 4
                        // Controla se achou um pixel HIT, se achou, para todas a iterações
                        let pixelIsWhite = false

                        for(let i = 0; i < 3; i++) {
                            const pixel = data[index + i]
                            const kernelPixel = kernel[kernelIndex++]

                            if(kernelPixel === 1 && pixel !== 0) {
                                pixelIsWhite = true
                                break
                            }
                        }

                        if(pixelIsWhite) {
                            anyWhite = true
                            break
                        }

                        if(anyWhite) {
                            break
                        }
                    }
                }

                const outputIndex = (y * width + x) * 4
                for (let i = 0; i < 4; i++) {
                    result[outputIndex + i] = anyWhite ? 255 : 0
                }
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

    const edge = () => {

    }

    return {
        erosion,
        dilation,
        opening,
        closing,
        edge
    }
}

export default useMorphology