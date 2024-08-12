import { IPaymentsReport } from "@/utils/interfaces/IPaymentsReport";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ESTRUCTURA DEL ESTADO PARA ALMACENAR LOS REPORTES DE PAGOS
export interface IAllPaymentsReports {
    paymentsReports : IPaymentsReport[],
    paymentsReportsLoading: boolean
}
// ESTRUCTURA COMPLETA DEL ESTADO PARA EL SLICE
interface IPaymentsReportState {
    allPaymentsReports: IAllPaymentsReports
}
// ESTADO INICIAL DEL SLICE DE REPORTES DE PAGOS
const initialState: IPaymentsReportState = {
    allPaymentsReports: {
        paymentsReports: [],
        paymentsReportsLoading: false
    }
}
// SLICE DE REDUX PARA EL MANEJO DEL ESTADO DE REPORTES DE PAGOS
export const PaymentsReportsSlice = createSlice({
    name: 'paymentsReports',
    initialState,
    reducers: {
        // FUNCION QUE ACTUALIZA EL ESTADO DE REPORTES DE PAGOS
        setPaymentsReports: (state, action: PayloadAction<IAllPaymentsReports>) => {
            state.allPaymentsReports = action.payload
        }
    }
})

export const {setPaymentsReports} = PaymentsReportsSlice.actions
export default PaymentsReportsSlice.reducer