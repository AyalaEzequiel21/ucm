import useScreenSize from "@/hooks/useScreenSize"
import { Button, useTheme } from "@mui/material"

interface CustomButtonProps {
    icon?: React.ReactNode
    label: string
    onClick: () => void
    disabled?: boolean
    mode: 'dark' | 'light'
}

const CustomButton: React.FC<CustomButtonProps> = ({icon, label, onClick, disabled, mode}) => {
    const {palette} = useTheme()
    const {isMobile} = useScreenSize()
    const isDark = mode === 'dark'

    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            sx={{
                border: !isDark ? ` 2px solid ${palette.primary.dark}`: 'none',
                borderRadius: '0.33rem',
                color: isDark ? palette.grey[200] :palette.primary.dark,
                backgroundColor: isDark ? palette.primary.dark : 'none',
                '&:hover': {
                    backgroundColor: isDark ? 'none' : palette.primary.dark,
                    border: isDark ? ` 2px solid ${palette.primary.dark}`: 'none',
                    color: isDark? palette.primary.dark : palette.secondary.main,

                }
            }}
        >
            {icon && <span className="icon">{icon}</span>} 
            {!isMobile &&<span className="label">{label}</span>}
        </Button>
    )
}

export {CustomButton}