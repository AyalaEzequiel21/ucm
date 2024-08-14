// Funcion para convertir un nro a un tipo String con formato $ 0.00
export const getFormatedValue = (value: number) => {
    const roundedValue = Math.round(value)
    return `$ ${roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}