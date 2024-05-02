import { IProduct } from "@/utils/interfaces/IProduct"
import { Card, CardContent, IconButton, Typography, useTheme } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { FlexBetween } from "./FlexBetween";

type ProductCardProps = {
    product: IProduct,
    isMobile: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isMobile}) => {

    const {palette} = useTheme()

    return (
        <Card
            sx={{
                backgroundImage: 'none',
                backgroundColor: palette.primary.dark,
                borderRadius: '0.55rem',
                p: '0.2rem 0',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${palette.secondary.main}`,
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                    // border: `2px solid  '

                }
            }}
        >
            <CardContent sx={{color: palette.grey[100]}}>
                <FlexBetween>
                    <Typography sx={{
                        fontWeight: 'bold', 
                        fontSize: isMobile ? '24px' : '22px', 
                        color: palette.secondary.main}}
                    >
                        {product.product_name}
                    </Typography>
                    <IconButton 
                        sx={{
                            color: palette.grey[100],
                            '&:hover': {
                                color: palette.secondary.main
                            }
                        }}
                    >
                        <EditIcon fontSize={isMobile ? 'large' : 'medium'} />
                    </IconButton>
                </FlexBetween>
                <Typography  sx={{ mb: '1.5rem', fontSize: isMobile ? '15px' : '17px' }}>
                    {`Stock: ${product.stock}`}
                </Typography>
                <Typography sx={{ mb: '0.5rem', fontSize: '17px', '&:hover': {color: palette.secondary.main} }}>{`Cargador: $${product.first_price ? product.first_price.toFixed(2) : ' -'}`}</Typography>
                <Typography sx={{ fontSize: '17px', '&:hover': {color: palette.secondary.main} }}>{`Carnicero: $${product.second_price ? product.second_price.toFixed(2) : ' -'}`}</Typography>
            </CardContent>
        </Card>
    )
}

export { ProductCard }