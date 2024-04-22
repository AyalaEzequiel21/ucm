import { CssBaseline } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useMemo } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { themeSettings } from "./config/theme"
import { Layout } from "./scenes/layout"

function App() {

  const theme = useMemo(()=> createTheme(themeSettings), [])

  return (
    <div className="app">
      <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Routes> 
                {/* <Route element={<Layout />}> */}
                  <Route path='/' element={<div>Home</div>}/>
                  <Route path='/clients' element={<div>Clients</div>}/>
                  <Route path='/products' element={<div>Products</div>}/>
                  <Route path='/payments' element={<div>Pagos</div>}/>
                {/* </Route> */}
              </Routes>
            </Layout>
          </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
