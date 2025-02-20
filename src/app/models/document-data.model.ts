import { DocumentData, TableUserInputs } from "../enums/invoice-document.enum";

export const documentData: Readonly<DocumentData> = {
  id:"",
  documentName: "",
  currency: "PLN",
  invoice:{
    form: {
      headerImage: "",
      invoiceNo: "",
      invoiceDate: "",
      invoiceDueDate: "",
      invoiceType: "",
      seller: "",
      sellerVAT: "",
      sellerStreetNo: "",
      sellerPostCode: "",
      sellerCity: "",
      sellerBankAcct: "",
      sellerBank: "",
      sellerSwift: "",
      buyer: "",
      buyerVAT: "",
      buyerStreetNo: "",
      buyerPostCode: "",
      buyerCity: ""
    },
    formTable: [] as TableUserInputs[],
    totals: {
      netTotal: "",
      vatTotal: "",
      grossTotal: "",
    },
  },
};