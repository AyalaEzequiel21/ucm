import { Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    section: {
        marginTop: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    table: {
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8, 
        overflow: 'hidden', 
        backgroundColor: '#f2f2f2', 
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        fontSize: 13,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
    },
    tableCell: {
        margin: 'auto',
        marginTop: 5,
        borderRadius: 4,
        fontSize: 10,
    },
});

// Interfaz genérica para las columnas y datos
interface ColumnConfig<T> {
    header: string;
    accessor: (item: T) => React.ReactNode;
}

interface TableSectionProps<T> {
    data: T[];
    columns: ColumnConfig<T>[];
    title: string;
}

// Componente genérico de tabla
const TablePdf = <T extends object>({ data, columns, title }: TableSectionProps<T>) => (
    <View style={styles.section}>
        {/* Título de la tabla */}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.table}>
            {/* Encabezados */}
            <View style={styles.tableRow}>
                {columns.map((col, index) => (
                    <View key={index} style={styles.tableCol}>
                        <Text style={styles.tableCell}>{col.header}</Text>
                    </View>
                ))}
            </View>
            {/* Filas */}
            {data.map((item, rowIndex) => (
                <View style={styles.tableRow} key={rowIndex}>
                    {columns.map((col, colIndex) => (
                        <View key={colIndex} style={styles.tableCol}>
                            <Text style={styles.tableCell}>{col.accessor(item)}</Text>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    </View>
);

export {TablePdf}