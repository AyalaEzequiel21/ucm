import React, { useState } from "react";
import { CustomDataGridProps, CustomDatGrid } from "./CustomDataGrid";
import { Box, Tab, Tabs } from "@mui/material";
import { GridPaginationModel } from "@mui/x-data-grid";

export interface TableExtended<T> extends CustomDataGridProps<T> {
    label: string
}
interface MultiTablesProps<T> {
    tables: TableExtended<T>[],
    halfHeight: boolean
}

const MultiTables= <T, >({tables, halfHeight}: MultiTablesProps<T>) => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 15 });

    const handleChangeTab = (event: React.ChangeEvent<object>, newValue: number) => {
        setSelectedTab(newValue)
        setPaginationModel({ ...paginationModel, page: 0 })

    }

    const handlePaginationChange = (model: GridPaginationModel) => {
        setPaginationModel(model);
    }

    return (
        <Box>
            <Tabs
                value={selectedTab}
                onChange={handleChangeTab}
                aria-label="multi table tabs"
            >
                {tables.map((table, index) => (
                    <Tab label={table.label} key={index} />
                ))}
            </Tabs>
            {tables.map((table, index) => (
                <Box
                    key={index}
                    role="tabpanel"
                    hidden={selectedTab !== index}
                    aria-labelledby={`simple-tab-${index}`}
                >
                    {selectedTab === index && (
                        <CustomDatGrid
                            rows={table.rows}
                            isFilterName={table.isFilterName}
                            fieldValue={table.fieldValue}
                            columnsBase={table.columnsBase}
                            isLoading={table.isLoading}
                            addedColumnsTable={table.addedColumnsTable}
                            addedColumnsDesktop={table.addedColumnsDesktop}
                            halfHeight={halfHeight}
                            lightMode={true}
                            paginationModel={paginationModel}
                            onPaginationChange={handlePaginationChange}
                        />
                    )}
                </Box>
            ))}
        </Box>
    )
}


export { MultiTables }