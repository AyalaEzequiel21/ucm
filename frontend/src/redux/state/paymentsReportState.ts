import { IPaymentsReport } from "@/utils/interfaces/IPaymentsReport";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface IAllPaymentsReports {
    paymentsReports : IPaymentsReport[],
    paymentsReportsLoading: boolean
}

interface IPaymentsReportState {
    allPaymentsReports: IAllPaymentsReports
}

const initialState: IPaymentsReportState = {
    allPaymentsReports: {
        paymentsReports: [],
        paymentsReportsLoading: false
    }
}

export const PaymentsReportsSlice = createSlice({
    name: 'paymentsReports',
    initialState,
    reducers: {
        setPaymentsReports: (state, action: PayloadAction<IAllPaymentsReports>) => {
            state.allPaymentsReports = action.payload
        }
    }
})

export const {setPaymentsReports} = PaymentsReportsSlice.actions
export default PaymentsReportsSlice.reducer