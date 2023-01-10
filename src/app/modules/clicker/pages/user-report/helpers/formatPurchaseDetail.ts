import { DateFormat } from "src/app/modules/shared/helpers/date-format"

export const formatPurchaseData = (data: any[]) => {
    if (!data) return [];
    return data.map(elem => {
        return {
            commissionGenerationDate: DateFormat.format(elem.commissionGenerationDate, 'YYYY-MM-DD'),
            productName: elem.productName,
            quantity: elem.quantity,
            business: elem.business,
            totalSale: elem.totalSale,
            commissionValue: elem.commissionValue,
            statusCommission: formatStatus(elem.statusCommission.toLocaleLowerCase()),
        }
    });
}

const formatStatus = (status: string) => {
    const statusFormatted = {
        'pendiente de pago': 'Por pagar',
        'rechazado': 'Rechazada',
        'validacion': 'Por validar',
        'acumulado': 'Acumulado',
    }[status];
    return statusFormatted || '';
}