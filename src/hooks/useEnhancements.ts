const useEnhancements = () => {
    const max = (image: ImageData) => {
        const { width, height, data } = image

        const result = new Uint8ClampedArray(data.length)

        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                let maxRed = 0
                let maxGreen = 0
                let maxBlue = 0
                let maxAlpha = 0

                for(let dy = -1; dy <= 1; dy++) {
                    for(let dx = -1; dx <= 1; dx++) {
                        const neighborX = x + dx
                        const neighborY = y + dy

                        // esse if estranho garante que o indice dos pixeis vizinhos estão dentro da imagem
                        if(neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
                            const neighborIndex = (neighborY * width + neighborX) * 4

                            maxRed = Math.max(maxRed, data[neighborIndex])
                            maxGreen = Math.max(maxGreen, data[neighborIndex + 1])
                            maxBlue = Math.max(maxBlue, data[neighborIndex + 2])
                            maxAlpha = Math.max(maxAlpha, data[neighborIndex + 3])
                        }
                    }
                }

                const index = (y * width + x) * 4

                result[index] = maxRed
                result[index + 1] = maxGreen
                result[index + 2] = maxBlue
                result[index + 3] = maxAlpha
            }
        }

        return new ImageData(result, width, height)
    }

    const min = (image: ImageData) => {
        const { width, height, data } = image

        const result = new Uint8ClampedArray(data.length)

        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                let minRed = 255
                let minGreen = 255
                let minBlue = 255
                let minAlpha = 255

                for(let dy = -1; dy <= 1; dy++) {
                    for(let dx = -1; dx <= 1; dx++) {
                        const neighborX = x + dx
                        const neighborY = y + dy

                        // esse if estranho garante que o indice dos pixeis vizinhos estão dentro da imagem
                        if(neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
                            const neighborIndex = (neighborY * width + neighborX) * 4

                            minRed = Math.min(minRed, data[neighborIndex])
                            minGreen = Math.min(minGreen, data[neighborIndex + 1])
                            minBlue = Math.min(minBlue, data[neighborIndex + 2])
                            minAlpha = Math.min(minAlpha, data[neighborIndex + 3])
                        }
                    }
                }

                const index = (y * width + x) * 4

                result[index] = minRed
                result[index + 1] = minGreen
                result[index + 2] = minBlue
                result[index + 3] = minAlpha
            }
        }

        return new ImageData(result, width, height)
    }

    const avg = (image: ImageData) => {
        const { width, height, data } = image

        const result = new Uint8ClampedArray(data.length)

        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                let red = 0
                let green = 0
                let blue = 0
                let alpha = 0

                for(let dy = -1; dy <= 1; dy++) {
                    for(let dx = -1; dx <= 1; dx++) {
                        const neighborX = x + dx
                        const neighborY = y + dy

                        // esse if estranho garante que o indice dos pixeis vizinhos estão dentro da imagem
                        if(neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
                            const neighborIndex = (neighborY * width + neighborX) * 4

                            red += data[neighborIndex]
                            green += data[neighborIndex + 1]
                            blue += data[neighborIndex + 2]
                            alpha += data[neighborIndex + 3]
                        }
                    }
                }

                const index = (y * width + x) * 4

                result[index] = red / 9
                result[index + 1] = green / 9
                result[index + 2] = blue / 9
                result[index + 3] = alpha / 9
            }
        }

        return new ImageData(result, width, height)
    }

    const median = (image: ImageData) => {
        const { width, height, data } = image

        const result = new Uint8ClampedArray(data.length)

        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                const redList: number[] = []
                const greenList: number[] = []
                const blueList: number[] = []
                const alphaList: number[] = []

                for(let dy = -1; dy <= 1; dy++) {
                    for(let dx = -1; dx <= 1; dx++) {
                        const neighborX = x + dx
                        const neighborY = y + dy

                        // esse if estranho garante que o indice dos pixeis vizinhos estão dentro da imagem
                        if(neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
                            const neighborIndex = (neighborY * width + neighborX) * 4

                            redList.push(data[neighborIndex])
                            greenList.push(data[neighborIndex + 1])
                            blueList.push(data[neighborIndex + 2])
                            alphaList.push(data[neighborIndex + 3])
                        }
                    }
                }

                redList.sort((a , b) => a - b)
                greenList.sort((a , b) => a - b)
                blueList.sort((a , b) => a - b)
                alphaList.sort((a , b) => a - b)

                const index = (y * width + x) * 4

                result[index] = redList[5]
                result[index + 1] = greenList[5]
                result[index + 2] = blueList[5]
                result[index + 3] = alphaList[5]
            }
        }

        return new ImageData(result, width, height)
    }

    const order = (image: ImageData, value: number) => {
        const { width, height, data } = image

        const result = new Uint8ClampedArray(data.length)

        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                const redList: number[] = []
                const greenList: number[] = []
                const blueList: number[] = []
                const alphaList: number[] = []

                for(let dy = -1; dy <= 1; dy++) {
                    for(let dx = -1; dx <= 1; dx++) {
                        const neighborX = x + dx
                        const neighborY = y + dy

                        // esse if estranho garante que o indice dos pixeis vizinhos estão dentro da imagem
                        if(neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
                            const neighborIndex = (neighborY * width + neighborX) * 4

                            redList.push(data[neighborIndex])
                            greenList.push(data[neighborIndex + 1])
                            blueList.push(data[neighborIndex + 2])
                            alphaList.push(data[neighborIndex + 3])
                        }
                    }
                }

                redList.sort((a , b) => a - b)
                greenList.sort((a , b) => a - b)
                blueList.sort((a , b) => a - b)
                alphaList.sort((a , b) => a - b)

                const index = (y * width + x) * 4

                result[index] = redList[value]
                result[index + 1] = greenList[value]
                result[index + 2] = blueList[value]
                result[index + 3] = alphaList[value]
            }
        }

        return new ImageData(result, width, height)
    }

    const consSmoothing = (image: ImageData) => {
        const { width, height, data } = image

        const result = new Uint8ClampedArray(data.length)

        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                const redList: number[] = []
                const greenList: number[] = []
                const blueList: number[] = []
                const alphaList: number[] = []

                for(let dy = -1; dy <= 1; dy++) {
                    for(let dx = -1; dx <= 1; dx++) {
                        const neighborX = x + dx
                        const neighborY = y + dy

                        const isTheOriginalPixel = (dy === 2 && dx === 2)

                        // esse if estranho garante que o indice dos pixeis vizinhos estão dentro da imagem
                        if(neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height && !isTheOriginalPixel) {
                            const neighborIndex = (neighborY * width + neighborX) * 4

                            redList.push(data[neighborIndex])
                            greenList.push(data[neighborIndex + 1])
                            blueList.push(data[neighborIndex + 2])
                            alphaList.push(data[neighborIndex + 3])
                        }
                    }
                }

                redList.sort((a , b) => a - b)
                greenList.sort((a , b) => a - b)
                blueList.sort((a , b) => a - b)
                alphaList.sort((a , b) => a - b)

                const checkPixel = (i: number, list: number[]) => {
                    if(data[i] > list[7]) 
                        return list[7]
                    else if(data[i] < list[0])
                        return list[0]
                    else 
                        return data[i]
                }

                const index = (y * width + x) * 4

                result[index] = checkPixel(index, redList)
                result[index + 1] = checkPixel(index, greenList)
                result[index + 2] = checkPixel(index, blueList)
                result[index + 3] = checkPixel(index, alphaList)
            }
        }

        return new ImageData(result, width, height)
    }

    return {
        max,
        min,
        avg,
        median,
        order,
        consSmoothing
    }
}

export default useEnhancements