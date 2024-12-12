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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isDark ? palette.primary.dark : 'none',
                p: '0.5rem',
                transition: "all 0.3s ease-in-out",
                '&:hover': {
                    backgroundColor: isDark ? palette.secondary.dark : palette.primary.dark,
                    border: isDark ? `2px solid ${palette.primary.dark}` : 'none',
                    color: isDark ? palette.grey[100] : palette.secondary.main,
                    boxShadow: `0px 4px 10px ${palette.primary.dark}`,
                    transform: 'scale(1.02)',
                }
            }}
        >
            {icon && <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="icon">{icon}</span>} 
            {!isMobile &&<span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="label">{label}</span>}
        </Button>
    )
}

export {CustomButton}