import { Header } from "@/components/Header"
import { NotFoundComponent } from "@/components/ui-components/NotFoundComponent"
import { ProductCard } from "@/components/ui-components/ProductCard"
import { SceneContainer } from "@/components/SceneContainer"
import { SpinnerLoading } from "@/components/ui-components/SpinnerLoading"
import useScreenSize from "@/hooks/useScreenSize"
import { RootState } from "@/redux/store"
import { Box } from "@mui/material"
import { useSelector } from "react-redux"
import { ProductAddForm } from "@/components/forms/add/ProductAddForm"
import { HeaderButton } from "@/components/ui-components/buttons/HeaderButton"


type ProductsProps = object

/**
 * Componente `Products`:
 * Este componente muestra una lista de productos en un formato de tabla con columnas adaptativas según el dispositivo (base, tablet, desktop).
 * También incluye un encabezado con el título y subtítulo de la vista.
 */
const Products: React.FC<ProductsProps> = () => {

    // Obtiene la lista de productos y el estado de carga desde el store de Redux.
    const {products, productsLoading} = useSelector((state: RootState) => state.product.allProducts)
    const userLogin = useSelector((state: RootState) => state.user.userLogin)
    const isDelivery = userLogin?.role === 'delivery'
    const { isMobile, isDesktop } = useScreenSize()

    if(productsLoading || !products) return <SpinnerLoading />

    return (
        <SceneContainer>
            <Header title={'PRODUCTOS'} subtitle={"Lista de productos"}>
                {!isDelivery && <HeaderButton
                    form={<ProductAddForm/>}
                    model="Producto"
                    type="add"
                    disabled={isDelivery}
                />}
            </Header>
            {products.length === 0 ? 
                <NotFoundComponent/> 
                :
                <Box 
                    display={'grid'}
                    gridTemplateColumns={isDesktop? `repeat(4, minmax(0,1fr))`: `repeat(3, minmax(0,1fr))`}
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