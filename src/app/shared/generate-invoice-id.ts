export function generateNewInvoiceId(): string{
    const unixTimestamp = Math.floor(Date.now() / 1000);
    return `_invoice-${unixTimestamp}`;
}