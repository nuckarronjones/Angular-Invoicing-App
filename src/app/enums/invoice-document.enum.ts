export interface TableUserInputs {
  rowId: string;
  name: string;
  quantity: string;
  quantUnit: string;
  unitNetPrice: string;
  vatPercentage: string;
  totalNet: string;
  totalGross: string;
}
export interface DocumentData {
  id: string;
  documentName: string;
  currency: string;
  invoice: Invoice;
}

interface Invoice {
  form: Form;
  formTable: TableUserInputs[];
  totals: Totals;
}

interface Totals {
  netTotal: string;
  vatTotal: string;
  grossTotal: string;
}

interface Form {
  headerImage: string;
  invoiceNo: string;
  invoiceDate: string;
  invoiceDueDate: string;
  invoiceType: string;
  seller: string;
  sellerVAT: string;
  sellerStreetNo: string;
  sellerPostCode: string;
  sellerCity: string;
  sellerBankAcct: string;
  sellerBank: string;
  sellerSwift: string;
  buyer: string;
  buyerVAT: string;
  buyerStreetNo: string;
  buyerPostCode: string;
  buyerCity: string;
}
