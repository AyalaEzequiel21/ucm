import useScreenSize from "@/hooks/useScreenSize"
import { Button, useTheme } from "@mui/material"


type ToolbarButtonProps = {
    icon: React.ReactNode | null,
    label: string,
    handleClick: ()=> void
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({icon, label, handleClick}) => {
    const { palette } = useTheme()
    const { isMobile }  = useScreenSize()

    return (
        <Button
            onClick={handleClick}
            sx={{
                border: ` 2px solid ${palette.primary.dark}`,
                borderRadius: '0.33rem',
                color: palette.primary.dark,
                '&:hover': {
                    backgroundColor: palette.primary.dark,
                    color: palette.secondary.main,

                }
            }}
        >
            {icon} {isMobile ? '' : label}
        </Button>
    )
}

export { ToolbarButton }