import { Box, Button, CircularProgress, Paper, Stack, Typography, useTheme } from "@mui/material"

type CustomFormLayoutProps = {
    handleSubmit: ()=> void,
    children: React.ReactNode,
    labelButton: string,
    title: string,
    isLoading: boolean,
    errorMessage: string | undefined
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