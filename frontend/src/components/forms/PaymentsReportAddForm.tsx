import { useAddPaymentsReportMutation } from "@/redux/api/paymentsReportApi";
import { IClientPayment } from "@/utils/interfaces/IClientPayment";
import { IPaymentsReport } from "@/utils/interfaces/IPaymentsReport";
import { FormAddProps } from "@/utils/types/FormAddProps";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CustomFormLayout } from "../CustomFormLayout";
import { ReportDetailsForm } from "./ReportDetailsForm";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { DetailsFormLayout } from "./DetailsFormLayout";
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue";

const PaymentsReportAddFotm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {
    
    const [addPaymentsReport, {isLoading}] = useAddPaymentsReportMutation()
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
        setDetailsReport(prev => [...prev, detail])
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
                confirmAlertSucess('Reporte de pago registrado');
                onCloseModal();
              } catch (error) {
                setErrorMessage(`Error al agregar el reporte de pago`)
                console.log(error)
                confirmErrorAlert()
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