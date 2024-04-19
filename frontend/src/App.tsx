import { Box, CssBaseline } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useMemo } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  const theme = useMemo(()=> createTheme(), [])
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width={'100%'} height={'100%'} p={'1rem 2rem 4rem 2rem'}>
            <Routes> 
              <Route path='/' element={<div>Home</div>}/>
              <Route path='/clients' element={<div>Clients</div>}/>
              <Route path='/products' element={<div>Products</div>}/>
              <Route path='/payments' element={<div>Pagos</div>}/>
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
