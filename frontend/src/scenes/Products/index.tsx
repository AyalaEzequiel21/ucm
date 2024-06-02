import { Header } from "@/components/Header"
import { ProductCard } from "@/components/ProductCard"
import { SceneContainer } from "@/components/SceneContainer"
import useScreenSize from "@/hooks/useScreenSize"
import { useGetAllProductsQuery } from "@/redux/api/productApi"
import { Box } from "@mui/material"
import { useEffect } from "react"


type ProductsProps = object

const Products: React.FC<ProductsProps> = () => {

    const {data} = useGetAllProductsQuery()
    const { isMobile } = useScreenSize()

    useEffect(()=> {console.log(data);
    }, [data])

    return (
        <SceneContainer>
            <Header title={'PRODUCTOS'} subtitle={"Lista de productos"} />
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
                {data?.data.map(product => {
                    return <ProductCard product={product} isMobile={isMobile} key={product._id}/>
                })}
            </Box>
        </SceneContainer>
    )
}

export {Products}