import { Button } from "@mui/material";
// Funcion que renderiza un boton principal utilizado en las tablas
export const renderButtonPrincipal = (_id: string, label: string, handleClick: ()=>void) => {
    
    return (
        <Button
            key={_id}
            onClick={()=> handleClick()}
            sx={{
                border: `1px solid #324E6A`, 
                borderRadius: '0.33rem',
                color: '#324E6A',
                fontWeight: 'bold',
                minWidth: '180px'
            }}
        >
            {label}
        </Button>
    )
}