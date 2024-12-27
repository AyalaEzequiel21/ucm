import { useAddUserMutation } from "@/redux/api/userApi";
import { INewUserValues } from "@/utils/interfaces/registerModels/INewUserValues";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CustomFormLayout } from "../../CustomFormLayout";
import { CustomInput } from "../../CustomInput";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType";
import { roleOptions } from "@/utils/interfaces/IRole";
import { useModalAlert } from "@/hooks/useModalAlert";

const UserAddForm: React.FC<object> = () => {

    const [addUser, {isLoading}] = useAddUserMutation()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const { toggleModal, toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const methods = useForm<INewUserValues>()
    const {
        handleSubmit,
        reset,
        formState: {errors}
    } = methods

    const onSubmit = async (dataForm: INewUserValues) => {
        const processedDataForm = {
            ...dataForm,
            username: getCapitalizeString(dataForm.username)
        }
        try{
            await addUser(processedDataForm).unwrap()            
            toggleSuccessAlert('Usuario agregado exitosamente')
            reset()
            toggleModal()
            
        } catch(e){
            const err = e as ApiErrorResponseType
            toggleErrorAlert('Error al agregar el usuario')
            console.log(err.data.message);
            setErrorMessage(err.data.message)
        }
    }

    return (
        <FormProvider {...methods}>
            <CustomFormLayout
                handleSubmit={handleSubmit(onSubmit)}
                title="Agregar Usuario"
                labelButton="Agregar"
                isLoading={isLoading}
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
                />
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
                <CustomInput 
                    type="text"
                    label="Role"
                    isSelect={true}
                    value="role"
                    msgError="Por favor seleccione el rol del usuario"
                    error={!!errors.role}
                    helperText={errors.role?.message}
                    selectOptions={roleOptions}
                />
            </CustomFormLayout>
        </FormProvider>
    )
}

export {UserAddForm}