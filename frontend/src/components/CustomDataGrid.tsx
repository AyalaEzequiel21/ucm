import useScreenSize from "@/hooks/useScreenSize"
import { Box, useTheme } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

/**
 * Componente CustomDatGrid:
 * Este componente es una tabla de datos personalizada que se adapta a diferentes tamaños de pantalla (móvil, tablet, y escritorio).
 * Utiliza Material-UI `DataGrid` para renderizar los datos y proporciona flexibilidad en la configuración de columnas y filtros.
 * Es útil para mostrar listas de datos que requieren paginación, ordenamiento, y filtrado adaptativos según el dispositivo.
 */
type CustomDataGridProps<T> = {
    rows: T[], // Lista de datos que se mostrarán en la tabla.
    isFilterName: boolean, // Indica si se debe aplicar un filtro basado en un campo específico.
    fieldValue?: string, // Nombre del campo para aplicar el filtro (opcional).
    columnsBase: GridColDef[], // Definición de columnas base que siempre se mostrarán.
    isLoading: boolean, // Indica si los datos están cargando, para mostrar un indicador de carga.
    addedColumnsTable: GridColDef[], // Columnas adicionales que se agregarán en vista tablet.
    addedColumnsDesktop: GridColDef[] // Columnas adicionales que se agregarán en vista escritorio.
}

const CustomDatGrid = <T,>({rows, isFilterName, fieldValue, columnsBase, isLoading, addedColumnsTable, addedColumnsDesktop}: CustomDataGridProps<T>) => {

    const {isMobile, isTablet, isDesktop } = useScreenSize()
    const {palette} = useTheme()

    const getColumns = () => {
        let columns: GridColDef[] = [...columnsBase]
        if(isTablet && (!isMobile && !isDesktop)) {
            columns = [...columns, ...addedColumnsTable]
        }
        if (isDesktop && (!isMobile && !isTablet)) {
            columns = [...columns, ...addedColumnsTable]
            columns = [...columns, ...addedColumnsDesktop]
        }
        return columns
    }

    return (
        <Box
            mt={'10px'}
            height={'80vh'}
        >
            <DataGrid 
                rows={rows}
                columns={getColumns()}
                getRowId={(row) => row._id}
                loading={isLoading}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 15,
                        }
                    },
                    sorting: {
                        sortModel: [{field: isFilterName && fieldValue ? fieldValue : 'createdAt', sort: 'asc'}]
                    },
                    filter:{
                        filterModel: {
                            items: []
                        }
                    }

                }}
                sx={{
                    maxWidth: '100%',
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: palette.primary.dark,
                        color: palette.grey[100],
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                    },
                    '& .MuiSvgIcon-root': {
                        color: palette.grey[100],
                    },
                    '& .MuiDataGrid-row': {
                        // height: '200px'
                    },
                    '& .MuiDataGrid-cell': {
                        fontSize: '1rem',
                        height: '0.9fr'
                    },
                    '& .MuiDataGrid-cell:focus-within': {
                        outline: 'none',
                      },
                    '& .MuiDataGrid-filler': {
                        height: '0%',
                        display: 'none'
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: palette.primary.dark,
                        '& .MuiTablePagination-root': {
                            color: palette.grey[100],
                        }
                    },

                }}
                pageSizeOptions={[15]}
                rowSelection={false}
            />
        </Box>
    )
}

export { CustomDatGrid }

