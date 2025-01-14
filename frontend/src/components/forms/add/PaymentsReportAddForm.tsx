import { useAddPaymentsReportMutation } from "@/redux/api/paymentsReportApi";
import { IClientPayment } from "@/utils/interfaces/IClientPayment";
import { IPaymentsReport } from "@/utils/interfaces/IPaymentsReport";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue";
import { CustomFormLayout } from "@/components/CustomFormLayout";
import { ReportDetailsForm } from "../ReportDetailsForm";
import { DetailsFormLayout } from "../DetailsFormLayout";
import { useModalAlert } from "@/hooks/useModalAlert";
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType";

const PaymentsReportAddFotm: React.FC<object> = () => {
    
    const [addPaymentsReport, {isLoading}] = useAddPaymentsReportMutation()
    const { toggleModal, toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const [detailsReport, setDetailsReport] = useState<Partial<IClientPayment>[]>([])
    const methods = useForm<Partial<IPaymentsReport>>({
        defaultValues: {
            payments_dto: [],
            payments: [],
        }
    })
    const { handleSubmit } = methods

    const onAddDetail = (detail: Partial<IClientPayment>) => {
        const exists = detailsReport.find(d => d.client_name === detail.client_name && d.payment_method === detail.payment_method)
        if(!exists){
            setDetailsReport(prev => [...prev, detail])
        } else {
            setErrorMessage('Ya se agrego un pago con el mismo cliente y metodo de pago.')
        }
    }

    const onRemoveDetail = (index: number) => {
        setDetailsReport(prev => prev.filter((_, i) => i !== index));
    }

    const onSubmit = async(dataForm: Partial<IPaymentsReport>) => {
        // const dataProcessed = {...dataForm, payments_dto: detailsReport }
        // console.log(dataProcessed)
        if(detailsReport.length > 0){
            const data: Partial<IPaymentsReport> = {...dataForm, payments_dto: detailsReport }  
            try {
                await addPaymentsReport(data).unwrap();
                toggleSuccessAlert('Reporte de pago agregado exitosamente')
                toggleModal()
            } catch (error) {
                const err = error as ApiErrorResponseType
                setErrorMessage(err.data.message)
                toggleErrorAlert(`Error al agregar el reporte de pago`)
            }
        } else {
            setErrorMessage('Agregue al menos un detalle.');
        }
    }

    return (
        <FormProvider {...methods}>
            <CustomFormLayout
                handleSubmit={handleSubmit(onSubmit)}
                title="Crear Reporte de Pago"
                labelButton="Crear"
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

export {PaymentsReportAddFotm}