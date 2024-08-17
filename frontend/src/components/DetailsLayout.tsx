import { Box } from "@mui/material"
import { Header } from "./Header"
import { SceneContainer } from "./SceneContainer"

interface DetailsLayoutProps {
    title: string,
    children: JSX.Element
}

export const DetailsLayout: React.FC<DetailsLayoutProps> = ({title, children}) => {

    return (
        <SceneContainer>
            <Header title={title} subtitle="Detalles"/>
            <Box>{children}</Box>
        </SceneContainer>
    )
}