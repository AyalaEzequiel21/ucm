import { Text, View, StyleSheet } from "@react-pdf/renderer"
import { table } from "console"

interface TablePdfProps {
    title: string
    columns: string[]
    rows: string[]
}

const styles = StyleSheet.create({
    table: {
        width: '100%',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
    },
    tableCell: {
        margin: 'auto',
        marginTop: 5,
        fontSize: 10,
    },
})

const TablePdf: React.FC<TablePdfProps> = ({columns, rows, title}) => {
    return (
        <View>
            <Text>{title}</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    {columns.map((column, index) => (
                        <View key={index} style={styles.tableCol}>
                            <Text style={styles.tableCell}>{column}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}
export { TablePdf }