import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"


type PaymentsToSuppliersProps = object

const PaymentsToSuppliers: React.FC<PaymentsToSuppliersProps> = () => {

    return(
        <SceneContainer>
            <Header title="PAGOS A PROVEEDORES" subtitle="Lista de pagos" />
        </SceneContainer>
    )
}

export { PaymentsToSuppliers }