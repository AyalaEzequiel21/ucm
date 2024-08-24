import { Box, Typography } from "@mui/material"

interface CustomTextItemProps {
    isTitle: boolean,
    icon?: React.ReactNode,
    tag?: string,
    children: React.ReactNode, 
}

const CustomTextItem: React.FC<CustomTextItemProps> = ({isTitle, children, tag, icon}) => {

    return (
        <Box
            display={'flex'}
            alignItems={'center'}    
            marginBottom={isTitle ? '1.3rem' : '0.5rem'}
        >
            { !isTitle && 
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mr={'0.2rem'}>
                    {icon && icon}
                </Box>
            }
            <Typography
                variant={isTitle ? 'h3' : 'h5'}
            >
                {tag && <span style={{fontWeight: 'bold'}}>{tag}: </span>}
                {children}
            </Typography>
        </Box>
    )
}

export { CustomTextItem }