import React from 'react';
import { IDetailsSale, ISaleDetails } from '@/utils/interfaces/ISale';
import { TablePdf } from './components/TablePdf';
import { getFormatedValue } from '@/utils/functionsHelper/getFormatedValue';
import { PdfDocument } from './components/PdfDocument';
import { DataSectionPdf } from './components/DataSectionPdf';

const columns = [
    { header: 'Producto', accessor: (item: ISaleDetails) => item.product_name },
    { header: 'Precio', accessor: (item: ISaleDetails) => getFormatedValue(item.price)},
    { header: 'Cantidad', accessor: (item: ISaleDetails) => item.quantity },
    { header: 'Total', accessor: (item: ISaleDetails) => getFormatedValue(item.price * item.quantity)}
]

const SaleDetailsPDF: React.FC<{ sale: IDetailsSale }> = ({ sale }) => {
    return (
        <PdfDocument
            isClient={true}
            name={sale.client_name}
            date={sale.createdAt}
        >
            <TablePdf
                title='Detalles de la Venta'
                data={sale.details}
                columns={columns}
            />
            <DataSectionPdf
                totalKg={sale.totalQuantity}
                totalAmount={sale.total_sale}
                total_payment={sale.payment?.amount}
                payment_method={sale.payment?.payment_method}
            />
        </PdfDocument>
    );
};

export default SaleDetailsPDF