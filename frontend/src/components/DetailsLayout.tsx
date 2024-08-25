import { Box } from "@mui/material"
import { Header } from "./Header"
import { SceneContainer } from "./SceneContainer"

interface DetailsLayoutProps {
    title: string,
    children: React.ReactNode
}

export const DetailsLayout: React.FC<DetailsLayoutProps> = ({title, children}) => {

    return (
        <SceneContainer>
            <Header title={title} subtitle={"Detalles"} type="details"/>
            <Box marginTop={'1rem'} width={'100%'}>{children}</Box>
        </SceneContainer>
    )
}