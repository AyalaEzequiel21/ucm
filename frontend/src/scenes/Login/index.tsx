import { ILoginFormValues } from "@/utils/interfaces/ILoginFormValues"
import { useTheme } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

type LoginProps = object

const Login: React.FC<LoginProps> = () => {

    const navigate = useNavigate()
    const {palette} = useTheme()
    const {register, handleSubmit, formState: {errors}} = useForm<ILoginFormValues>()

    
    return (
        <>
        </>
    )
}

export { Login }