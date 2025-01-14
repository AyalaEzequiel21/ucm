import { ILoginFormValues } from "@/utils/interfaces/ILoginFormValues";
import {
  Box,
  Container,
  useTheme,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.jpeg";
import { CustomInput } from "@/components/CustomInput";
import { useLoginMutation } from "@/redux/api/userApi";
import { useEffect, useState } from "react";
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/utils/interfaces/IUser";
import { useDispatch } from "react-redux";
import { login } from "@/redux/state/userState";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CustomFormLayout } from "@/components/CustomFormLayout";

type LoginProps = object;

/**
 * Componente Login:
 * Este componente renderiza la pantalla de inicio de sesión de la aplicación. 
 * Utiliza un formulario gestionado por React Hook Form para capturar las credenciales del usuario 
 * (nombre de usuario y contraseña), las cuales se envían a la API para la autenticación. 
 * Si la autenticación es exitosa, el token JWT recibido se decodifica, se almacena en el local storage, 
 * y se actualiza el estado de la aplicación con la información del usuario. 
 * En caso de error, se muestra un mensaje de error en la pantalla.
 */
const Login: React.FC<LoginProps> = () => {
  const { palette } = useTheme();
  const methods = useForm<ILoginFormValues>()
  const {
    handleSubmit,
    formState: { errors },
  } = methods
  const [loginUser, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginLocalUser, getJwtLocalStorage } = useLocalStorage();
  const jwt = getJwtLocalStorage()


  const onSubmit = async (dataForm: ILoginFormValues) => {
    setErrorMessage(undefined);
    try {
      const response = await loginUser(dataForm).unwrap();
      const decodedToken = jwtDecode<IUser>(response.token);
      dispatch(login(decodedToken ));
      loginLocalUser(response.token);
      navigate("/home");
    } catch (e) {
      const err = e as ApiErrorResponseType;
      setErrorMessage(err.data.message);
    }
  };

  useEffect(()=> {
    if(jwt){
        navigate('/home')
        const jwtDecoded: IUser = jwtDecode(jwt)
        dispatch(login(jwtDecoded))            
    }
}, [jwt, dispatch, navigate])

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: palette.grey[300],
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormProvider {...methods}>
        <CustomFormLayout 
          handleSubmit={handleSubmit(onSubmit)}
          title="Iniciar Sesion"
          labelButton="Iniciar"
          isLoading={isLoading}
          errorMessage={errorMessage}
      >
          <Box
            component="img"
            src={logo}
            alt="logo"
            sx={{ height: 170, width: 220 }}
          />
          <CustomInput
            type="text"
            label="Usuario"
            isSelect={false}
            value="username"
            msgError="Por favor ingrese su nombre de usuario"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <CustomInput
            type="password"
            label="Contraseña"
            isSelect={false}
            value="password"
            msgError="Por favor ingrese su contraseña"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </CustomFormLayout>
      </FormProvider>
    </Container>
  );
};

export { Login };
