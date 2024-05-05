import { DataGrid, GridColDef } from "@mui/x-data-grid"


type GeneralDataGridProps<T> = {
    columns: GridColDef[],
    rows: T[]
}

const GeneralDatGrid = <T,>({columns, rows}: GeneralDataGridProps<T>) => {

    return (
        <DataGrid 
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id}
            pagination
            autoPageSize
            sortingOrder={['desc', 'asc']}
            sx={{
                // height: '100%',
                // width: '100%'
            }}
        />
    )
}

export { GeneralDatGrid }

{/* <DataGrid 
    rows={clients}
    columns={columns}
    getRowId={(row) => row._id}
    pagination
    autoPageSize
    sortingOrder={['desc', 'asc']}
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