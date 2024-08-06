import { Close } from "@mui/icons-material"
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material"


type DetailsFormLayoutProps<T> = {
    details: T[],
    renderDetail: (detail: T, index: number) => React.ReactNode;
    onRemoveDetail: (index: number) => void
}

    const DetailsFormLayout = <T,>({ details, renderDetail, onRemoveDetail }: DetailsFormLayoutProps<T>) => {

    const {palette} = useTheme()
    return(
        <Box>
            {details.map((detail, index) => (
                <Box key={index}>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent={'center'} paddingTop={'0.2rem'} paddingBottom={'0.3rem'} borderBottom={'1px solid ' + palette.primary.dark}>
                        <Typography sx={{fontSize: '13px', fontWeight: 'bold', color: palette.primary.dark, textAlign: 'start', width: '100%'}}>
                            {renderDetail(detail, index)}
                        </Typography>
                        <IconButton onClick={() => onRemoveDetail(index)}><Close sx={{color: palette.primary.dark}}/></IconButton>
                    </Stack>
                </Box>
            ))}
        </Box>
    )
}

export { DetailsFormLayout }