import { CssBaseline } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useMemo } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
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

function App() {

  const theme = useMemo(()=> createTheme(themeSettings), [])

  return (
    <div className="app">
      <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
              <Routes> 
                <Route element={<Layout />}>
                  <Route path='/' element={<div>Home</div>}/>
                  <Route path='/clients' element={<Clients />}/>
                  <Route path='/products' element={<Products />}/>
                  <Route path='/clientsPayments' element={<Payments />}/>
                  <Route path='/users' element={<Users />}/>
                  <Route path='/paymentsReport' element={<PaymentsReports />}/>
                  <Route path='/sales' element={<Sales />}/>
                  <Route path='/suppliers' element={<Suppliers />}/>
                  <Route path='/paymentsToSuppliers' element={<PaymentsToSuppliers />}/>
                  <Route path='/purchases' element={<Purchases />}/>
                </Route>
              </Routes>
          </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
