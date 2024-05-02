import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"


type SuppliersProps = object

const Suppliers: React.FC<SuppliersProps> = () => {

    return(
        <SceneContainer>
            <Header title="PROVEEDORES" subtitle="Lista de proveedores" />
        </SceneContainer>
    )
}

export { Suppliers }