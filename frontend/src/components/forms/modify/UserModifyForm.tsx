import { CustomFormLayout } from "@/components/CustomFormLayout";
import { CustomInput } from "@/components/CustomInput";
import { useModalAlert } from "@/hooks/useModalAlert";
import { useModifyUserMutation } from "@/redux/api/userApi";
import { roleOptions } from "@/utils/interfaces/IRole";
import { IUser, IUserMongo } from "@/utils/interfaces/IUser";
import { IUpdateUserValues  } from "@/utils/interfaces/registerModels/INewUserValues";
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType";
import { Box, Button, Collapse } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface UserModifyProps {
    user: IUser
}

const UserModifyForm: React.FC<UserModifyProps> = ({ user }) => {
    const [modifyUser, { isLoading }] = useModifyUserMutation()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const methods = useForm<IUpdateUserValues >()
    const { toggleModal, toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const { handleSubmit, reset, formState: {errors} } = methods
    const [showPasswordField, setShowPasswordField] = useState(false)

    const onSubmit = async (dataForm: IUpdateUserValues ) => {
        if(dataForm.username !== user.username || dataForm.role !== user.role || dataForm.password) {
            const updatedUser: IUserMongo = {
                _id: user._id,
                username: dataForm.username,
                role: dataForm.role,
            }
            if (showPasswordField && dataForm.password) {
                updatedUser.password = dataForm.password; // Solo incluir la contraseña si se completó
            }
            if (
                updatedUser.username !== user.username ||
                updatedUser.role !== user.role ||
                updatedUser.password
            ) {
                try {
                    await modifyUser(updatedUser).unwrap()
                    toggleSuccessAlert('Usuario modificado con éxito')
                    reset()
                    toggleModal()
                } catch (error) {
                    const err = error as ApiErrorResponseType
                    toggleErrorAlert('Error al modificar el usuario')
                    setErrorMessage(err.data.message)
                }
            } 
        } else {
            setErrorMessage('No se realizaron cambios');
        }
    }

    return (
        <FormProvider {...methods}>
            <CustomFormLayout
                handleSubmit={handleSubmit(onSubmit)}
                isLoading={isLoading}
                labelButton="Modificar"
                title="Modificar Usuario"
                errorMessage={errorMessage}
            >
                <CustomInput 
                    type="text"
                    label="Nombre del Usuario"
                    isSelect={false}
                    value="username"
                    msgError="Por favor ingrese el nombre del usuario"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    minLength={5}
                    maxLength={15}
                    defaultValue={user.username}
                />
                <CustomInput 
                    type="text"
                    label="Role"
                    isSelect={true}
                    value="role"
                    msgError="Por favor seleccione el rol del usuario"
                    error={!!errors.role}
                    helperText={errors.role?.message}
                    selectOptions={roleOptions}
                    defaultValue={user.role}
                />
                <Box>
                    <Button onClick={() => setShowPasswordField(!showPasswordField)}>
                        {showPasswordField ? 'Cancelar cambio de contraseña' : 'Cambiar contraseña'}
                    </Button>
                </Box>
                {showPasswordField && (
                    <Collapse in={showPasswordField} timeout="auto" unmountOnExit sx={{width: '100%'}}>
                        <CustomInput
                            type="password"
                            label="Contraseña"
                            isSelect={false}
                            value="password"
                            msgError="Por favor ingrese una contraseña"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            minLength={8}
                            maxLength={15}
                        />
                    </Collapse>
                )}
            </CustomFormLayout>
        </FormProvider>
    )
}

export { UserModifyForm }