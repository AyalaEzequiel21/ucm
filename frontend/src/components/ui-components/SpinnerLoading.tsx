import { Box, CircularProgress } from "@mui/material"

type SpinnerLoadingProps = object

const SpinnerLoading: React.FC<SpinnerLoadingProps> = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
        }}
    >
        <CircularProgress size={50} thickness={5}/>
    </Box>
)

export { SpinnerLoading }