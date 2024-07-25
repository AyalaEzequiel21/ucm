import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"

type PaymentsReportsProps = object

const PaymentsReports: React.FC<PaymentsReportsProps> = () => {

    return(
        <SceneContainer>
            <Header title="REPORTES DE PAGOS" subtitle="Lista de reportes de pagos" />
        </SceneContainer>
    )
}

export { PaymentsReports }