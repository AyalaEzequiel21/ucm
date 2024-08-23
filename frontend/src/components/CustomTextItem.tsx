import { Box, Typography } from "@mui/material"

interface CustomTextItemProps {
    label: string,
    data: string
}

const CustomTextItem: React.FC<CustomTextItemProps> = ({label, data}) => {

    return (
        <Box>
            <Typography sx={{fontWeight: 'bold', fontSize: '0.9rem'}}>{label}: {data}</Typography>
        </Box>
    )
}

export { CustomTextItem }