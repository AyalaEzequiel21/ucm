import {  Card, useTheme } from "@mui/material"

interface DetailsCardProps {
    children: React.ReactNode,
    size: 'M'|'L'|'XL'
}

const DetailsCard: React.FC<DetailsCardProps> = ({children, size}) => {

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
                padding: spacing(1.5),
                backgroundColor: palette.grey[100],
                borderRadius: '0.55rem',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                color: palette.primary.dark,
                width: getWidth(),
                minHeight: '7rem',
                border: `1px solid ${palette.divider}`,
                transition: 'border-color 0.5s ease',
                '&:hover': {
                    borderColor: palette.primary.dark
                }
            }}
        >
            {children}  
        </Card>
    )
}

export { DetailsCard }