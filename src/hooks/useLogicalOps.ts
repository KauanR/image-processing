const useLogicalOps = () => {
    const and = (imageOne: ImageData, imageTwo?: ImageData) => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] = result.data[i] && (imageTwo?.data[i] || 0)
            result.data[i + 1] = result.data[i + 1] && (imageTwo?.data[i + 1] || 0)
            result.data[i + 2] = result.data[i + 2] && (imageTwo?.data[i + 2] || 0)
        }

        return result
    }

    const or = (imageOne: ImageData, imageTwo?: ImageData) => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] = result.data[i] || (imageTwo?.data[i] || 0)
            result.data[i + 1] = result.data[i + 1] || (imageTwo?.data[i + 1] || 0)
            result.data[i + 2] = result.data[i + 2] || (imageTwo?.data[i + 2] || 0)
        }

        return result
    }

    const xor = (imageOne: ImageData, imageTwo?: ImageData) => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] = result.data[i] === imageTwo?.data[i] ? 0 : 255
            result.data[i + 1] = result.data[i + 1] === imageTwo?.data[i + 1] ? 0 : 255
            result.data[i + 2] = result.data[i + 2] === imageTwo?.data[i + 2] ? 0 : 255
        }

        return result
    }

    const not = (imageOne: ImageData, imageTwo?: ImageData) => {
        const result = new ImageData(new Uint8ClampedArray(imageOne.data), 250, 285)

        for(let i = 0; i < result.data.length; i += 4) {
            result.data[i] = 255 - result.data[i]
            result.data[i + 1] = 255 - result.data[i + 1]
            result.data[i + 2] = 255 - result.data[i + 2]
        }

        return result
    }

    return {
        and,
        or,
        xor,
        not
    }
}

export default useLogicalOps