import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue";
import { Close } from "@mui/icons-material"
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material"


type DetailsFormLayoutProps<T> = {
    details: T[],
    renderDetail: (detail: T, index: number) => React.ReactNode;
    onRemoveDetail: (index: number) => void,
    totalAdd?: number
}

    const DetailsFormLayout = <T,>({ details, renderDetail, onRemoveDetail, totalAdd }: DetailsFormLayoutProps<T>) => {

    const {palette} = useTheme()
    return(
        <Box>
            <Box
                sx={{
                    maxHeight: '150px',
                    overflowY: 'auto',
                    paddingRight: '0.5rem',
                }}
            >
                {details.map((detail, index) => (
                    <Box 
                        key={index}
                        sx={{
                            '&:hover': {
                                backgroundColor: palette.grey[200],
                                borderRadius: '0.33rem', 
                                padding: '0.2rem',
                            },
                            transition: 'background-color 0.3s',
                        }}    
                    >
                        <Stack 
                            direction="row" 
                            spacing={1} 
                            alignItems="center" 
                            justifyContent={'center'} 
                            paddingTop={'0.2rem'} 
                            paddingBottom={'0.3rem'} 
                            borderBottom={'1px solid ' + palette.primary.dark}
                        >
                            <Typography sx={{fontSize: '13px', fontWeight: 'bold', color: palette.primary.dark, textAlign: 'start', width: '100%', whiteSpace: 'pre-wrap'}}>
                                {renderDetail(detail, index)}
                            </Typography>
                            <IconButton onClick={() => onRemoveDetail(index)}><Close sx={{color: palette.primary.dark}}/></IconButton>
                        </Stack>
                    </Box>
                ))}
            </Box>
            {totalAdd && <Typography sx={{fontSize: '15px', fontWeight: 'bold', color: palette.primary.dark, textAlign: 'start', width: '100%', marginTop: '0.5rem'}}>Total = {getFormatedValue(totalAdd)} </Typography>}
        </Box>
    )
}

export { DetailsFormLayout }