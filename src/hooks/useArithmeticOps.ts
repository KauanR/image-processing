const useArithmeticOps = () => {
    const add = (imageOne: ImageData, imageTwo?: ImageData) => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] += imageTwo?.data[i] || 0
            result.data[i + 1] += imageTwo?.data[i + 1] || 0
            result.data[i + 2] += imageTwo?.data[i + 2] || 0
            result.data[i + 3] += imageTwo?.data[i + 3] || 0
        }

        return result
    }

    const subtract = (imageOne: ImageData, imageTwo?: ImageData) => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] -= imageTwo?.data[i] || 0
            if(result.data[i] < 0) result.data[i] = 0

            result.data[i + 1] -= imageTwo?.data[i + 1] || 0
            if(result.data[i + 1] < 0) result.data[i + 1] = 0

            result.data[i + 2] -= imageTwo?.data[i + 2] || 0
            if(result.data[i + 2] < 0) result.data[i + 2] = 0
        }

        return result
    }

    const multiply = (imageOne: ImageData, imageTwo?: ImageData) => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] *= imageTwo?.data[i] || 0
            if(result.data[i] > 255) result.data[i] = 255

            result.data[i + 1] *= imageTwo?.data[i + 1] || 0
            if(result.data[i + 1] > 255) result.data[i + 1] = 255

            result.data[i + 2] *= imageTwo?.data[i + 2] || 0
            if(result.data[i + 2] > 255) result.data[i + 2] = 255

            result.data[i + 3] *= imageTwo?.data[i + 3] || 0
            if(result.data[i + 3] > 255) result.data[i + 3] = 255
        }

        return result
    }

    const divide = (imageOne: ImageData, imageTwo?: ImageData) => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] /= imageTwo?.data[i] || 0
            result.data[i + 1] /= imageTwo?.data[i + 1] || 0
            result.data[i + 2] /= imageTwo?.data[i + 2] || 0
        }

        return result
    }

    const blend = (blendingVal: number, imageOne: ImageData, imageTwo?: ImageData) => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] = blendingVal * result.data[i] + (1 - blendingVal) * (imageTwo?.data[i] || 0)
            result.data[i + 1] = blendingVal * result.data[i + 1] + (1 - blendingVal) * (imageTwo?.data[i + 1] || 0)
            result.data[i + 2] = blendingVal * result.data[i + 2] + (1 - blendingVal) * (imageTwo?.data[i + 2] || 0)
        }

        return result
    }

    return {
        add,
        subtract,
        multiply,
        divide,
        blend
    }

}

export default useArithmeticOps