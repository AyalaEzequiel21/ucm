import { ILoginFormValues } from "@/utils/interfaces/ILoginFormValues"
import { Box, Button, CircularProgress, Container, Paper, Stack, Typography, useTheme } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import logo from '@/assets/logo.jpeg'
import { CustomInput } from "@/components/CustomInput"
import { useLoginMutation } from "@/redux/api/userApi"
import { useState } from "react"
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType"
import {jwtDecode} from 'jwt-decode';
import { IUser } from "@/utils/interfaces/IUser"
import { useDispatch } from "react-redux"
import { login } from "@/redux/state/userState"
import { useLocalStorage } from "@/hooks/useLocalStorage"

type LoginProps = object

const Login: React.FC<LoginProps> = () => {

    const {palette} = useTheme()
    const {register, handleSubmit, formState: {errors}} = useForm<ILoginFormValues>()
    const [loginUser, { isLoading }] = useLoginMutation()
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined);
    const dispatch = useDispatch();
    const navigate = useNavigate()  
    const {loginLocalUser} = useLocalStorage()

    const onSubmit = async (dataForm: ILoginFormValues) => {
        setErrorMessage(undefined)
        try {
            const response = await loginUser(dataForm).unwrap()
            const decodedToken = jwtDecode<IUser>(response.token)
            dispatch(login(decodedToken))
            loginLocalUser(response.token)
            navigate('/')
        } catch(e){
            const err = e as ApiErrorResponseType
            setErrorMessage(err.data.message)
        }
    }

    return (
        <Container maxWidth={false} sx={{
            backgroundColor: palette.grey[300], 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            }}>
            <Box display={'flex'} alignContent={'center'} justifyContent={'center'}>
                <Paper elevation={10} sx={{p: '2rem', borderRadius: '0.5em', width: '320px'}}>
                    <Box component={'form'} onSubmit={handleSubmit(onSubmit)} >
                        <Stack spacing={2} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography variant="h2" sx={{textAlign: 'center', fontWeight: 'bold', color: palette.primary.dark}}>Iniciar Sesión</Typography>    
                            <Box
                                component='img'
                                src={logo}
                                alt="logo"
                                sx={{ height: 170, width: 220}}
                            />
                            <CustomInput
                                type="text"
                                label="Usuario"
                                register={register}
                                value="username"
                                msgError="Por favor ingrese su nombre de usuario"
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
                            <CustomInput
                                type="password" 
                                label='Contraseña' 
                                register={register}
                                value="password"
                                msgError="Por favor ingrese su contraseña"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
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
                                {isLoading ? <CircularProgress color="inherit" size={30}/> : 'Iniciar'}
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
        </Container>
    )
}

export { Login }