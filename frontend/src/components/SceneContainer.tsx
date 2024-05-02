import { Box } from "@mui/material"

type SceneContainerProps = {
    children: React.ReactNode
}

const SceneContainer: React.FC<SceneContainerProps> = ({children}) => {

    return (
        <Box m={'1rem'} pb={'1rem'}>
            {children}
        </Box>
    )
}

export { SceneContainer }