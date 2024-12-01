import { IProduct } from "@/utils/interfaces/IProduct"
import { Box, Card, CardContent, Divider, IconButton, Menu, Typography, useTheme } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FlexBetween } from "../FlexBetween";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { useState } from "react";

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

    const {palette} = useTheme()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <Card
            sx={{
                backgroundImage: 'none',
                backgroundColor: palette.primary.dark,
                borderRadius: '1rem',
                p: '0.5rem 0',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${palette.divider}`,
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
                    <IconButton
                        sx={{
                            color: palette.grey[100],
                            '&:hover': {
                                color: palette.secondary.main,
                            },
                        }}
                        onClick={handleMenuClick}
                    >
                        <MoreVertIcon fontSize={isMobile ? 'large' : 'medium'} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        PaperProps={{
                            style: {
                                borderRadius: '0.5rem',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        <FlexBetween flexDirection={'column'}>
                            <IconButton
                                sx={{
                                    color: palette.grey[100],
                                    '&:hover': {
                                        color: palette.secondary.main,
                                    },
                                }}
                            >
                                <EditIcon fontSize={isMobile ? 'large' : 'medium'} />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: palette.grey[100],
                                    '&:hover': {
                                        color: palette.error.light,
                                    },
                                }}
                            >
                                <DeleteIcon fontSize={isMobile ? 'large' : 'medium'} />
                            </IconButton>
                        </FlexBetween>

                    </Menu>
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
                            // textAlign: 'center',
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