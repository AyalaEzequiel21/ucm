import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import logo from "@/assets/logo.jpeg"
import { getFormatedDate } from "@/utils/functionsHelper/getFormatedDate"

interface PdfDocumentProps {
    isClient: boolean,
    name: string,
    date: string,
    children: React.ReactNode
}

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 13
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    logo: {
        width: 150,
        height: 110,
    },
    messageSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    headerText: {
        fontSize: 14,
        marginBottom: 3
    },
    message: {
        marginTop: 5,
        fontSize: 11,
        borderRadius: 8,        
        borderWidth: 1,  
        borderColor: '#000', 
        borderStyle: 'solid', 
        padding: 5, 
    }
})

const PdfDocument: React.FC<PdfDocumentProps> = ({isClient, name, date, children}) => {

    return (
        <Document>
            <Page size={'A4'} style={styles.page}>
                <View style={styles.header}>
                    <Image style={styles.logo} src={logo}/>
                    <View >
                        <Text style={styles.headerText}>Fecha: {getFormatedDate(date)}</Text>
                        <Text style={styles.headerText}>{`${isClient ? 'Cliente' : 'Proveedor'}: ${name}`}</Text>
                        <View style={styles.message}>
                            <Text>No valido como factura</Text>
                        </View>
                    </View>
                </View>
                <View>
                    {children}
                </View>
            </Page>
        </Document>
    )
}   

export { PdfDocument }