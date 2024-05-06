import { useTheme } from "@mui/material"
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
        <DataGrid 
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
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
                // '& .MuiDataGrid-toolbarContainer': {
                //     backgroundColor: palette.primary.dark,
                //   },
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
                    height: '200px'
                  },
                  '& .MuiDataGrid-cell': {
                    fontSize: '0.9rem',
                  },

            }}
            pageSizeOptions={[10]}
        />
    )
}

export { CustomDatGrid }

{/* <DataGrid 
    disableColumnFilter
    sx={{
        maxWidth: '100%',
        "& .MuiDataGrid-root": {
            // border: "none",
            },
            "& .MuiDataGrid-cell": {
            // borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeader": {
            color: palette.grey[100],
            backgroundColor: palette.primary.dark,
            // borderBottom: "none",
            },
            '& .MuiDataGrid-columnHeader .MuiButtonBase-root .MuiSvgIcon-root': {
            fill: palette.grey[100],
            },
            "& .MuiDataGrid-virtualScroller": {
            backgroundColor: palette.grey[100],
            },
            "& .MuiDataGrid-footerContainer": {
            backgroundColor: palette.primary.dark,
            color: palette.grey[100],
            // borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            // color: `${palette.grey[100]} !important`,
            },
    }}
/> */}