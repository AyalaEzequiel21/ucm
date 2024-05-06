import { Box, useTheme } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

type CustomDataGridProps<T> = {
    columns: GridColDef[],
    rows: T[],
    isFilterName: boolean,
    fieldValue?: string 
}

const CustomDatGrid = <T,>({columns, rows, isFilterName, fieldValue}: CustomDataGridProps<T>) => {

    const {palette} = useTheme()

    return (
        <Box
                mt={'10px'}
                height={'80vh'}
        >
            <DataGrid 
                rows={rows}
                columns={columns}
                getRowId={(row) => row._id}
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

