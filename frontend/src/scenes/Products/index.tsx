import { Header } from "@/components/Header"
import { Box } from "@mui/material"


type ProductsProps = {

}

const Products: React.FC<ProductsProps> = () => {


    return (
        <Box>
            <Header title={'Productos'} subtitle={"Lista de productos"} />
        </Box>
    )
}

export {Products}