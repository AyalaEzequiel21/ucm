import { useModifyPaymentsReportMutation } from "@/redux/api/paymentsReportApi";
import { IClientPayment } from "@/utils/interfaces/IClientPayment";
import { IPaymentsReport } from "@/utils/interfaces/IPaymentsReport";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CustomFormLayout } from "../../CustomFormLayout";
import { ReportDetailsForm } from "./../ReportDetailsForm";
import { DetailsFormLayout } from "./../DetailsFormLayout";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue";
import { useModalAlert } from "@/hooks/useModalAlert";
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType";


interface PaymentsReportModifyProps {
    paymentsReportData: IPaymentsReport
}

const PaymentsReportModifyForm: React.FC<PaymentsReportModifyProps> = ({ paymentsReportData }) => {
    const [modifyPaymentsReport, { isLoading }] = useModifyPaymentsReportMutation()
    const {toggleModal, toggleErrorAlert, toggleSuccessAlert} = useModalAlert()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const [detailsReport, setDetailsReport] = useState<Partial<IClientPayment>[]>(paymentsReportData.payments_dto)
    const methods = useForm<Partial<IClientPayment>>({
        defaultValues: {
            client_name: '',
            amount: 0,
            payment_method: 'efectivo'
        }
    })
    const { handleSubmit, reset } = methods

    const onAddDetail = (detail: Partial<IClientPayment>) => {
        setDetailsReport(prev => [...prev, detail])
    }

    const onRemoveDetail = (index: number) => {
        setDetailsReport(prev => prev.filter((_, i) => i !== index));
    }

    const hasChanges = () => {
        if(detailsReport.length !== paymentsReportData.payments_dto.length) return true
        return detailsReport.some((detail, index) => {
            const original = paymentsReportData.payments_dto[index]
            return(
                detail.client_name !== original.client_name ||
                detail.payment_method !== original.payment_method ||
                detail.amount !== original.amount
            )
        })
    }

    const onSubmit = async() => {
        if(!hasChanges()) {
            setErrorMessage('No se realizaron cambios en el reporte.')
            return
        }
        try {
            setErrorMessage(undefined)
            await modifyPaymentsReport({...paymentsReportData, payments_dto: detailsReport}).unwrap()
            toggleSuccessAlert('Reporte de pagos modificado con éxito.')
            reset()
            toggleModal()
        } catch (error) {
            const err = error as ApiErrorResponseType 
            console.error(error)
            setErrorMessage(err.data.message)
            toggleErrorAlert('Error al modificar el reporte de pagos.')
        }
    }

    return (
        <FormProvider {...methods}>
            <CustomFormLayout
                handleSubmit={handleSubmit(onSubmit)}
                title="Modificar Reporte de Pagos"
                labelButton="Modificar"
                isLoading={isLoading}
                errorMessage={errorMessage}
            >
                <ReportDetailsForm
                    onAddDetail={onAddDetail}
                />
                <DetailsFormLayout
                    details={detailsReport}
                    renderDetail={(detail) => `-${getCapitalizeString(detail.client_name || '')}: ${getFormatedValue(detail.amount || 0) || '-'} - ${getCapitalizeString(detail.payment_method || '-')}`}
                    onRemoveDetail={onRemoveDetail}
                />
            </CustomFormLayout>
        </FormProvider>
    )
}

export { PaymentsReportModifyForm }