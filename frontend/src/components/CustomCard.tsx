import {  Card, useTheme } from "@mui/material"

interface CustomCardProps {
    children: React.ReactNode,
    size: 'M'|'L'|'XL'
}

const CustomCard: React.FC<CustomCardProps> = ({children, size}) => {

    const {palette, spacing} = useTheme()
    const getWidth = () => {

        switch (size) {
            case 'M': return '40%'
            case 'L': return '50%'
            case 'XL': return '70%'
            default: return '40%'
        }
    }

    return (
        <Card
            sx={{
                padding: spacing(1),
                backgroundColor: palette.primary.dark,
                borderRadius: '0.55rem',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${palette.grey[100]}`,
                color: palette.grey[100],
                width: getWidth(),
                minHeight: '7rem',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: palette.primary.main,
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                }
            }}
        >
            {children}  
        </Card>
    )
}

export { CustomCard }
