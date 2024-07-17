import { Header } from "@/components/Header"
import { ProductCard } from "@/components/ProductCard"
import { SceneContainer } from "@/components/SceneContainer"
import useScreenSize from "@/hooks/useScreenSize"
import { RootState } from "@/redux/store"
import { Box, CircularProgress } from "@mui/material"
import { useSelector } from "react-redux"


type ProductsProps = object

const Products: React.FC<ProductsProps> = () => {

    const {products, productsLoading} = useSelector((state: RootState) => state.product.allProducts)
    const { isMobile } = useScreenSize()

    return (
        <SceneContainer>
            <Header title={'PRODUCTOS'} subtitle={"Lista de productos"} />
            {productsLoading ? 
                <CircularProgress color="inherit" size={30}/> 
                :
                <Box 
                    display={'grid'}
                    gridTemplateColumns={`repeat(4, minmax(0,1fr))`}
                    justifyContent={'space-between'}
                    rowGap={'20px'}
                    columnGap={'1.33%'}
                    margin={'0 auto'}
                    sx={{
                        '& > div' : { gridColumn: isMobile ? 'span 4' : undefined, mt: ' 1rem' }
                    }}
                >
                {products.map(product => {
                    return <ProductCard product={product} isMobile={isMobile} key={product._id}/>
                })}
            </Box>}
        </SceneContainer>
    )
}

export {Products}