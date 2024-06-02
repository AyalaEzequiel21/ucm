const getCapitalizeString = (text: string) => {
    const words = text.split(' ')
    const capitalizeWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    })

    const result = capitalizeWords.join(' ')
    return result
}

export {getCapitalizeString}