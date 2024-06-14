import { useAddUserMutation } from "@/redux/api/userApi";
import { INewUserValues } from "@/utils/interfaces/registerModels/INewUserValues";
import { FormAddProps } from "@/utils/types/FormAddProps";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CustomFormLayout } from "../CustomFormLayout";
import { CustomInput } from "../CustomInput";
import { ISelectOptions } from "@/utils/interfaces/ISelectOptions";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType";

const UserAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {

    const [addUser, {isLoading}] = useAddUserMutation()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
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
            // const response = 
            await addUser(processedDataForm).unwrap()            
            confirmAlertSucess(`El cliente se registro con exito`)
            reset()
            onCloseModal()
            
        } catch(e){
            const err = e as ApiErrorResponseType
            confirmErrorAlert()
            console.log(err.data.message);
            setErrorMessage(err.data.message)
        }
    }

    const roleOptions: ISelectOptions[] = [
        {
            label: 'Biller',
            value: 'biller'
        },
        {
            label: 'Delivery',
            value: 'delivery'
        }
    ]

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