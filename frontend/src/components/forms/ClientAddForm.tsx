import { useForm } from "react-hook-form"
import { CustomFormLayout } from "../CustomFormLayout"
import { CustomInput } from "../CustomInput"
import { INewClientValues } from "@/utils/interfaces/registerModels/INewCLientValues"
import { ISelectOptions } from "@/utils/interfaces/ISelectOptions"

type ClientAddFormProps = object

const ClientAddForm: React.FC<ClientAddFormProps> = () => {

    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm<INewClientValues>()

    const onSubmit = () => {}

    const categoriesOptions: ISelectOptions[] = [
        {
            label: 'Cargador',
            value: 'cat_1'
        },
        {
            label: 'Carnicero',
            value: 'cat_2'
        }
    ]

    return (
        <CustomFormLayout
            handleSubmit={handleSubmit(onSubmit)}
            title="Agregar Cliente"
            labelButton="Agregar cliente"
            isLoading={false}
            errorMessage={undefined}
        >
            <CustomInput 
                type="text"
                label="Nombre del Cliente"
                register={register}
                isSelect={false}
                value="fullname"
                msgError="Por favor ingrese el nombre del cliente"
                error={!!errors.fullname}
                helperText={errors.fullname?.message}
            />
            <CustomInput 
                type="text"
                label="Telefono del Cliente"
                register={register}
                isSelect={false}
                value="phone"
                msgError="Por favor ingrese el telefono del cliente"
                error={!!errors.phone}
                helperText={errors.phone?.message}
            />
            <CustomInput 
                type="text"
                label="Categoria"
                register={register}
                isSelect={true}
                value="category"
                msgError="Seleccione una categoria para el cliente"
                error={!!errors.category}
                helperText={errors.category?.message}
                selectOptions={categoriesOptions}
            />
            
        </CustomFormLayout>
    )
}

export {ClientAddForm}