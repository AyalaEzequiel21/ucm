import useScreenSize from "@/hooks/useScreenSize"
import { Box, Typography, useTheme } from "@mui/material"
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid"

/**
 * Componente CustomDatGrid:
 * Este componente es una tabla de datos personalizada que se adapta a diferentes tamaños de pantalla (móvil, tablet, y escritorio).
 * Utiliza Material-UI `DataGrid` para renderizar los datos y proporciona flexibilidad en la configuración de columnas y filtros.
 * Es útil para mostrar listas de datos que requieren paginación, ordenamiento, y filtrado adaptativos según el dispositivo.
 */

export type CustomDataGridProps<T> = {
    rows: T[], // Lista de datos que se mostrarán en la tabla.
    isFilterName: boolean, // Indica si se debe aplicar un filtro basado en un campo específico.
    fieldValue?: string, // Nombre del campo para aplicar el filtro (opcional).
    columnsBase: GridColDef[], // Definición de columnas base que siempre se mostrarán.
    isLoading: boolean, // Indica si los datos están cargando, para mostrar un indicador de carga.
    addedColumnsTable?: GridColDef[], // Columnas adicionales que se agregarán en vista tablet.
    addedColumnsDesktop?: GridColDef[] // Columnas adicionales que se agregarán en vista escritorio.
    halfHeight?: boolean // Indica si la altura de la tabla debe ser la mitad del tamaño de la pantalla.
    lightMode?: boolean // Indica si la tabla debe mostrar el modo claro.
    paginationModel?: GridPaginationModel, // Estado de la paginación.
    onPaginationChange?: (model: GridPaginationModel) => void, // Función para manejar el cambio de paginación.
    idName?: keyof T
}

const CustomDatGrid = <T,>({
    rows, 
    isFilterName, 
    fieldValue, 
    columnsBase, 
    isLoading, 
    addedColumnsTable, 
    addedColumnsDesktop, 
    halfHeight, 
    lightMode,
    paginationModel,
    onPaginationChange,
    idName
}: CustomDataGridProps<T>) => {

    const {isMobile, isTablet, isDesktop } = useScreenSize()
    const {palette} = useTheme()

    const getColumns = () => {
        let columns: GridColDef[] = [...columnsBase]
        if(isTablet && (!isMobile && !isDesktop) && addedColumnsTable) {
            columns = [...columns, ...addedColumnsTable]
        }
        if (isDesktop && (!isMobile && !isTablet) && addedColumnsTable && addedColumnsDesktop) {
            columns = [...columns, ...addedColumnsTable]
            columns = [...columns, ...addedColumnsDesktop]
        }
        return columns
    }

    return (
        <Box
            mt={'10px'}
            height={halfHeight? '50vh': '80vh'}
        >
            {rows.length > 0 ? 
                <DataGrid 
                    rows={rows}
                    columns={getColumns()}
                    getRowId={(row) => idName ? row[idName] : row['_id']}
                    loading={isLoading}
                    paginationModel={paginationModel}
                    pageSizeOptions={[15]}
                    onPaginationModelChange={onPaginationChange}    
                    initialState={{
                        pagination: {
                            paginationModel: (!paginationModel && !onPaginationChange) ? { page: 0, pageSize: 15 } : undefined,
                        },
                        sorting: {
                            sortModel: [{ field: isFilterName && fieldValue ? fieldValue : 'createdAt', sort: 'asc' }],
                        },
                        filter: {
                            filterModel: {
                                items: [],
                            },
                        },
                    }}
                    sx={{
                        maxWidth: '100%',
                        border: lightMode? `1px solid ${palette.primary.dark}` : 'none',
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: lightMode? palette.grey[100] : palette.primary.dark,
                            color: lightMode? palette.primary.dark : palette.grey[100],
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                        },
                        '& .MuiSvgIcon-root': {
                            color: lightMode? palette.primary.dark : palette.grey[100],
                        },
                        '& .MuiDataGrid-cell': {
                            fontSize: '1rem',
                            height: '0.9fr',
                            color: palette.primary.dark ,
                        },
                        '& .MuiDataGrid-cell:focus-within': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-filler': {
                            height: '0%',
                            display: 'none'
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: lightMode? palette.grey[100] : palette.primary.dark,
                            color: lightMode ? palette.primary.dark : palette.grey[100],
                            '& .MuiTablePagination-root': {
                                color: lightMode? palette.primary.dark : palette.grey[100],
                            },
                            '& .MuiSvgIcon-root': {
                                color: lightMode ? palette.primary.dark : palette.grey[100],
                            }
                        },

                    }}
                    rowSelection={false}
                /> 
            :
                <Box display="flex" justifyContent="center" alignItems="center" height="100%" sx={{backgroundColor: palette.grey[100]}}>
                    <Typography
                        variant="h4"
                        color={lightMode? palette.primary.dark : palette.grey[100]}
                    >
                        No se encontraron resultados
                    </Typography>
                </Box>}
        </Box>
    )
}

export { CustomDatGrid }

