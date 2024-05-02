import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"


type PaymentsProps = object

const Payments: React.FC<PaymentsProps> = () => {

    return(
        <SceneContainer>
            <Header title="PAGOS A CLIENTES" subtitle="Lista de pagos" />
        </SceneContainer>
    )
}

export { Payments }