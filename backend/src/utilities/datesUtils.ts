const convertDateString = (dateString: String) => {
    const [day, month, year] = dateString.split('/').map(Number) // CONVERT THE DATE TO NUMBERS
    const startOfDay = new Date(year, month - 1, day, 0, 0, 0, 0) // CREATE A DATE FOR THE START OF THE DAY
    const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999) // CREATE A DATE FOR THE END OF THE DAY

    return {  // RETURN THE OBJECT FOR SEARCH BY CREATEDAT
        $gte: startOfDay,
        $lte: endOfDay
    }
}

const validateDate = (date:string) => {
    const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/ // REGEX FOR VALIDATE IF DATE HAS THE VALID FORMAT
    if(!regex.test(date)) {
        return false  // IF THE DATE HAS NOT THE VALID FORMAT, RETURN FALS
    }
    const [day, month, year] = date.split('/').map(Number) //CONVERT THE DATE TO NUMBERS
    const newDate = new Date(year, month - 1, day) // MAKE A NEW OBJECT DATE WITH ENTERED DATE

    const actualDate = new Date() // GET THE ACTUAL DATE TO COMPARATE
    actualDate.setHours(0,0,0,0) // SET THE TIMA DATE

    return newDate <= actualDate // CHECK THAT NEW DATE DON'T BE LATER THAT ACTUAL DATE
}

export { convertDateString, validateDate }