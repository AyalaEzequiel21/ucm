import { Box, Button, CircularProgress, Paper, Stack, Typography, useTheme } from "@mui/material"

/**
 * Componente CustomFormLayout:
 * Este componente proporciona una estructura de formulario reutilizable con un diseño centrado.
 * Es ideal para formularios de autenticación, registro o cualquier otro tipo de formulario que requiera un diseño consistente y estilizado.
 * Incluye un manejo de errores y un botón con un indicador de carga cuando se está procesando la solicitud.
 */
type CustomFormLayoutProps = {
    handleSubmit: () => void, // Función que se ejecuta al enviar el formulario.
    children: React.ReactNode, // Elementos del formulario que se renderizarán dentro del layout.
    labelButton: string, // Texto del botón de envío.
    title: string, // Título del formulario.
    isLoading: boolean, // Estado de carga que desactiva el botón y muestra un spinner.
    errorMessage: string | undefined // Mensaje de error a mostrar en caso de que ocurra un fallo.
}

const CustomFormLayout: React.FC<CustomFormLayoutProps> = ({
    handleSubmit, 
    children, 
    title,
    labelButton, 
    isLoading,
    errorMessage
}) => {

    const {palette} = useTheme()

    return (
        <Box>
            <Paper elevation={10} sx={{p: '3rem 2rem', borderRadius: '0.5em', width: '340px'}}>
                    <Box component={'form'} onSubmit={handleSubmit} >
                        <Stack spacing={2} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography variant="h2" sx={{textAlign: 'center', fontWeight: 'bold', color: palette.primary.dark}}>{title}</Typography>    
                            {children}
                            <Button
                                type="submit"
                                fullWidth
                                disabled={isLoading}
                                sx={{
                                    backgroundColor: palette.primary.dark,
                                    color: palette.grey[100],
                                    p: ' 0.8rem 0',
                                    '&:hover': {
                                        color: palette.primary.dark,
                                        backgroundColor: 'none',
                                        border: `2px solid ${palette.primary.dark}}`,
                                    }
                                }}
                            >
                                {isLoading ? <CircularProgress color="inherit" size={30}/> : labelButton}
                            </Button>
                            {(errorMessage) && 
                                    <Box>
                                        <Typography sx={{color: 'red'}}>
                                            {errorMessage}
                                        </Typography>
                                    </Box>}
                        </Stack>
                    </Box>
                </Paper>
        </Box>
    )
}

export {CustomFormLayout}