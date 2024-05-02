import { Header } from "@/components/Header"
import { SceneContainer } from "@/components/SceneContainer"


type UsersProps = object

const Users: React.FC<UsersProps> = () => {

    return(
        <SceneContainer>
            <Header title="USUARIOS" subtitle="Lista de usuarios" />
        </SceneContainer>
    )
}

export { Users }