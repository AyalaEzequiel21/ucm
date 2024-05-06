
export const getFormatedValue = (value: number) => {
    const roundedValue = Math.round(value)
    return `$ ${roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}