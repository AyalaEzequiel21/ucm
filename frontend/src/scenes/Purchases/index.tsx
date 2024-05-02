import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"


type PurchasesProps = object

const Purchases: React.FC<PurchasesProps> = () => {

    return(
        <SceneContainer>
            <Header title="COMPRAS A PROVEEDORES" subtitle="Lista de compras" />
        </SceneContainer>
    )
}

export { Purchases }