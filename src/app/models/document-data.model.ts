import { DocumentData, ITableUserInputs } from "../enums/invoice-document.enum";

export const documentData: DocumentData = {
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
    formTable: [] as ITableUserInputs[],
    totals: {
      netTotal: "",
      vatTotal: "",
      grossTotal: "",
    },
  },
};