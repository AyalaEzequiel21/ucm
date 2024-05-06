export const getFormatedDate = (dateString: string) => {
    const date = new Date(dateString)
    let day = date.getDate().toString()
    let month = (date.getMonth() + 1).toString()
    const year = date.getFullYear().toString()

    day = day.padStart(2, '0')
    month = month.padStart(2, '0')

    return `${day}/${month}/${year}`
}