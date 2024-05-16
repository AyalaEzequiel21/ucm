import { CustomFormLayout } from "../CustomFormLayout"
import { CustomInput } from "../CustomInput"

type ClientAddFormProps = object

const ClientAddForm: React.FC<ClientAddFormProps> = () => {


    return (
        <CustomFormLayout>
            <CustomInput />
            <CustomInput />
            <CustomInput />
        </CustomFormLayout>
    )
}

export {ClientAddForm}