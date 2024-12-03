import { IProduct } from "@/utils/interfaces/IProduct"
import { Box, Card, CardContent, Divider, Typography, useTheme } from "@mui/material"
import { FlexBetween } from "../FlexBetween";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { DropDownMenu } from "./DropdownMenu";
import { ProductAddForm } from "../forms/ProductAddForm";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProductModifyForm } from "../forms/ProductModifyForm";

/**
 * Componente ProductCard:
 * Muestra una tarjeta de producto con información detallada.
 * La apariencia de la tarjeta se ajusta según si el dispositivo es móvil o no.
 */
type ProductCardProps = {
    product: IProduct, // Información del producto que se mostrará en la tarjeta.
    isMobile: boolean // Indica si la vista actual es en un dispositivo móvil.
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isMobile}) => {
    const {userLogin} = useSelector((state: RootState) => state.user)
    const isDelivery = userLogin?.role === 'delivery'
    const {palette} = useTheme()

    return (
        <Card
            sx={{
                backgroundImage: 'none',
                backgroundColor: palette.primary.dark,
                borderRadius: '1rem',
                p: '0.5rem',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${palette.divider}`,
                maxWidth: !isMobile ? '23rem' : '100%' ,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
                }
            }}
        >
            <CardContent sx={{color: palette.grey[100]}}>
                <FlexBetween >
                    <Typography sx={{
                        fontWeight: 'bold', 
                        fontSize: isMobile ? '24px' : '20px',
                        color: palette.secondary.main,
                    }}
                    >
                        {getCapitalizeString(product.product_name)}
                    </Typography>
                    {!isDelivery && <DropDownMenu
                        model="Producto"
                        formEdit={<ProductModifyForm productData={product} />}
                        formDelete={<ProductAddForm/>}
                    />}
                </FlexBetween>
                <Divider sx={{ mb: '0.5rem', backgroundColor: palette.grey[100] }} />
                <Typography
                    variant="body1"
                    sx={{
                        mb: '0.5rem',
                        color: palette.grey[100],
                    }}
                >
                    {`Stock: ${product.stock}`}
                </Typography>
                <FlexBetween flexDirection={'column'} gap={1} alignContent={"start"}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: palette.grey[100],
                            backgroundColor: palette.secondary.main,
                            borderRadius: '0.5rem',
                            padding: '0.5rem 0.6rem',
                            fontSize: isMobile ? '14px' : '16px',
                            width: '100%'
                        }}
                    >
                        {`Cargador: $${product.first_price?.toFixed(2) || '-'}`}
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            color: palette.grey[100],
                            backgroundColor: palette.secondary.main,
                            borderRadius: '0.5rem',
                            padding: '0.5rem 0.6rem',
                            fontSize: isMobile ? '14px' : '16px',
                            width: '100%'
                        }}
                    >
                        {`Cargador: $${product.second_price?.toFixed(2) || '-'}`}
                    </Typography>
                </FlexBetween>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                        }}
                    > 
                    </Box>
            </CardContent>
        </Card>
    )
}

export { ProductCard }