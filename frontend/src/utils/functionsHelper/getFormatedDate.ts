// Funcion para convertir un tipo Date a un tipo String con formato dd/mm/yyyy
export const getFormatedDate = (dateString: string) => {
    if (dateString === '') return '-'
    const date = new Date(dateString)
    let day = date.getDate().toString()
    let month = (date.getMonth() + 1).toString()
    const year = date.getFullYear().toString()

    day = day.padStart(2, '0')
    month = month.padStart(2, '0')

    return `${day}/${month}/${year}`
}