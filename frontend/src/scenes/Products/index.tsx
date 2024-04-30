import { Header } from "@/components/Header"
import { ProductCard } from "@/components/ProductCard"
import useScreenSize from "@/hooks/useScreenSize"
import { getSomeProducts } from "@/utils/dataUtils/dataMock"
import { Box } from "@mui/material"


type ProductsProps = object

const Products: React.FC<ProductsProps> = () => {

    const data = getSomeProducts()
    const {isMobile} = useScreenSize()

    return (
        <Box m={'1rem'} pb={'1rem'}>
            <Header title={'PRODUCTOS'} subtitle={"Lista de productos"} />
            <Box 
                display={'grid'}
                gridTemplateColumns={`repeat(4, minmax(0,1fr))`}
                justifyContent={'space-between'}
                rowGap={'20px'}
                columnGap={'1.33%'}
                sx={{
                    // maxWidth: '90%',
                    '& > div' : { gridColumn: isMobile ? 'span 4' : undefined, mt: ' 1rem' }
                }}
            >
                {data.products.map(product => {
                    return <ProductCard product={product} isMobile={isMobile}/>
                })}
            </Box>
        </Box>
    )
}

export {Products}