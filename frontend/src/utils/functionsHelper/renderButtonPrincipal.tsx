import { Button } from "@mui/material";

export const renderButtonPrincipal = (_id: string, label: string, handleClick: ()=>void) => {
    return (
        <Button
            key={_id}
            onClick={()=> handleClick()}
        >
            {label}
        </Button>
    )
}