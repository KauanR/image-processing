const useGaussFilter = (image: ImageData, value: number): ImageData => {
    const kernelHandler = (size: number, stdDeviation: number) => {
        const kernel: number[][] = []
        const kernelOffset = Math.floor(size / 2)

        let sum = 0

        for(let y = -kernelOffset; y <= kernelOffset; y++) {
            const row: number[] = []

            for(let x = -kernelOffset; x <= kernelOffset; x++) {
                const exponent = -(x * x + y * y) / (2 * Math.pow(stdDeviation, 2))
                const value = Math.exp(exponent) / (2 * Math.PI * Math.pow(stdDeviation, 2))

                row.push(value)

                sum += value
            }

            kernel.push(row)
        }

        for(let y = 0; y < size; y++) {
            for(let x = 0; x < size; x++) {
                kernel[y][x] /= sum
            }
        }

        return kernel
    }

    const { width, height, data } = image
    const resultData = new Uint8ClampedArray(data.length)

    const kernelSize = 5
    const kernelOffset = Math.floor(kernelSize / 2)

    const kernel = kernelHandler(kernelSize, value)

    console.log(kernel)

    for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            let [redSum, greenSum, blueSum, kernelSum] = [0, 0, 0, 0]

            for(let kernelY = 0; kernelY < kernelSize; kernelY++) {
                for(let kernelX = 0; kernelX < kernelSize; kernelX++) {
                    const imageX = x + (kernelX - kernelOffset)
                    const imageY = y + (kernelY - kernelOffset)

                    if((imageX >= 0 && imageX < width) && (imageY >= 0 && imageY < height)) {
                        const index = (imageY * width + imageX) * 4
                        const kernelVal = kernel[kernelY][kernelX]

                        kernelSum += kernelVal
                        redSum += data[index] * kernelVal
                        greenSum += data[index + 1] * kernelVal
                        blueSum += data[index + 2] * kernelVal
                    }
                }
            }

            const redIndex = (y * width + x) * 4

            resultData[redIndex] = Math.floor(redSum / kernelSum)
            resultData[redIndex + 1] = Math.floor(greenSum / kernelSum)
            resultData[redIndex + 2] = Math.floor(blueSum / kernelSum)
            resultData[redIndex + 3] = data[redIndex + 3]
        }
    }

    return new ImageData(resultData, width, height)
}

export default useGaussFilter