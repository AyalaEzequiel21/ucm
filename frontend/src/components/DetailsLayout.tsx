import { Box } from "@mui/material"
import { SceneContainer } from "./SceneContainer"

interface DetailsLayoutProps {
    children: React.ReactNode
}

export const DetailsLayout: React.FC<DetailsLayoutProps> = ({children}) => {

    return (
        <SceneContainer>
            <Box marginTop={'1rem'} width={'100%'}>{children}</Box>
        </SceneContainer>
    )
}