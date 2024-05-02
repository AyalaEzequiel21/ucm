import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"


type SalesProps = object

const Sales: React.FC<SalesProps> = () => {

    return(
        <SceneContainer>
            <Header title="VENTAS" subtitle="Lista de ventas" />
        </SceneContainer>
    )
}

export { Sales }