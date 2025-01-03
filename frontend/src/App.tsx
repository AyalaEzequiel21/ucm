import { CssBaseline } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useMemo } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { themeSettings } from "./config/theme"
import { Layout } from "./scenes/layout"
import { Products } from "./scenes/Products"
import { Clients } from "./scenes/Clients"
import { Payments } from "./scenes/Payments"
import { Users } from "./scenes/Users"
import { PaymentsReports } from "./scenes/Reports"
import { Sales } from "./scenes/Sales"
import { Suppliers } from "./scenes/Suppliers"
import { PaymentsToSuppliers } from "./scenes/PaymentsToSupplier"
import { Purchases } from "./scenes/Purchases"
import { Home } from "./scenes/Home"
import { Login } from "./scenes/Login"
import { ClientDetails } from "./scenes/Clients/ClientDetails"
import { SaleDetails } from "./scenes/Sales/SaleDetails"
import { PaymentDetails } from "./scenes/Payments/PaymentDetails"
import { PurchaseDetails } from "./scenes/Purchases/PurchaseDetails"
import { PaymentToSupplierDetails } from "./scenes/PaymentsToSupplier/PaymentToSupplierDetails"
import { SupplierDetails } from "./scenes/Suppliers/SupplierDetails"
import { PaymentsReportDetails } from "./scenes/Reports/PaymentsReportDetails"
import { ModalProvider } from "./context/ModalContext"

function App() {

  const theme = useMemo(()=> createTheme(themeSettings), [])

  return (
    <div className="app">
      <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
              <Routes> 
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path='/login' element={<Login/>}/>
                <Route element={
                  <ModalProvider>
                    <Layout />
                  </ModalProvider>}
                >
                  <Route path='/home' element={<Home/>}/>
                  <Route path='/clients' element={<Clients />}/>
                  <Route path='/clients/client/:id' element={<ClientDetails />}/>
                  <Route path='/products' element={<Products />}/>
                  <Route path='/clientsPayments' element={<Payments />}/>
                  <Route path='/clientPayments/payment/:id' element={<PaymentDetails />}/>
                  <Route path='/users' element={<Users />}/>
                  <Route path='/paymentsReport' element={<PaymentsReports />}/>
                  <Route path='/paymentsReport/report/:id' element={<PaymentsReportDetails />}/>
                  <Route path='/sales' element={<Sales />}/>
                  <Route path='/sales/sale/:id' element={<SaleDetails />}/>
                  <Route path='/suppliers' element={<Suppliers />}/>
                  <Route path='/suppliers/supplier/:id' element={<SupplierDetails />}/>
                  <Route path='/paymentsToSuppliers' element={<PaymentsToSuppliers />}/>
                  <Route path='/paymentsToSuppliers/payment/:id' element={<PaymentToSupplierDetails />}/>
                  <Route path='/purchases' element={<Purchases />}/>
                  <Route path='/purchases/purchase/:id' element={<PurchaseDetails/>}/>
                </Route>
              </Routes>
          </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
