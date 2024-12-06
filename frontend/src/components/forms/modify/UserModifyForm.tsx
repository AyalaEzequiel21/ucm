import { CustomFormLayout } from "@/components/CustomFormLayout";
import { CustomInput } from "@/components/CustomInput";
import { useModalAlert } from "@/context/ModalContext";
import { useGetUserByIdQuery, useModifyUserMutation } from "@/redux/api/userApi";
import { roleOptions } from "@/utils/interfaces/IRole";
import { IUser } from "@/utils/interfaces/IUser";
import { INewUserValues } from "@/utils/interfaces/registerModels/INewUserValues";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";


interface UserModifyProps {
    userId: string
}

const UserModifyForm: React.FC<UserModifyProps> = ({ userId }) => {
    const [modifyUser, { isLoading }] = useModifyUserMutation()
    const user = useGetUserByIdQuery(userId)
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const methods = useForm<INewUserValues>()
    const { toggleModal, toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const { handleSubmit, reset, formState: {errors} } = methods

    const onSubmit = async (dataForm: INewUserValues) => {
        
    }

    useEffect(() => {
        console.log(user);
        
    }, [user])
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
                    defaultValue={userData?.username}
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
                    defaultValue={userData?.role}
                />
            </CustomFormLayout>
        </FormProvider>
    )
}

export { UserModifyForm }