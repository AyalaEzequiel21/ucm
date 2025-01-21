import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue";
import { PaymentMethodType } from "@/utils/types/PaymentMethodType";
import { StyleSheet, Text, View } from "@react-pdf/renderer";


interface DataSectionPdfProps {
    totalKg: number,
    totalAmount: number,
    total_payment?: number,
    payment_method?: PaymentMethodType
}

const styles = StyleSheet.create({
    section: {
        marginTop: 10
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemSection: {
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    paymentSection: {
        marginTop: 10,
    }
})

const DataSectionPdf: React.FC<DataSectionPdfProps> = ({ totalKg, totalAmount, total_payment, payment_method }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>Totales:</Text>
            <View style={styles.itemSection}>
                <Text>Total de Kg: {totalKg} kg</Text>
            </View>
            <View style={styles.itemSection}>
                <Text>Total de venta: {getFormatedValue(totalAmount)}</Text>
            </View>
            {total_payment && payment_method && (<View style={styles.paymentSection}>
                <Text style={styles.title}>Detalles del Pago:</Text>
                <View style={styles.itemSection}>
                    <Text>Total de pago: {getFormatedValue(total_payment)}</Text>
                </View>
                <View style={styles.itemSection}>
                    <Text>Método de Pago: {payment_method}</Text>
                </View>
            </View>)}
        </View>
    )
}

export { DataSectionPdf }