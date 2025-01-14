import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { IDetailsSale } from '@/utils/interfaces/ISale';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    section: {
        marginBottom: 10,
    },
    table: {
        // display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
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
});

const SaleDetailsPDF: React.FC<{ sale: IDetailsSale }> = ({ sale }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image style={styles.logo} src="/path/to/logo.png" />
                    <Text>Nombre de la Empresa</Text>
                </View>
                <View style={styles.section}>
                    <Text>Fecha: {new Date(sale.createdAt).toLocaleDateString()}</Text>
                    <Text>Cliente: {sale.client_name}</Text>
                </View>
                {sale.payment && (
                    <View style={styles.section}>
                        <Text>Detalles del Pago:</Text>
                        {sale.payment && (
                            <Text key={sale._id}>Método de Pago: {sale.payment.payment_method}, Monto: {sale.payment.amount}</Text>
                        )}
                    </View>
                )}
                <View style={styles.section}>
                    <Text>Detalles de la Venta:</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Producto</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Precio</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Cantidad</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Total</Text></View>
                        </View>
                        {sale.details.map((detail, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={styles.tableCol}><Text style={styles.tableCell}>{detail.product_name}</Text></View>
                                <View style={styles.tableCol}><Text style={styles.tableCell}>{detail.price}</Text></View>
                                <View style={styles.tableCol}><Text style={styles.tableCell}>{detail.quantity}</Text></View>
                                <View style={styles.tableCol}><Text style={styles.tableCell}>{detail.quantity * detail.price}</Text></View>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default SaleDetailsPDF;