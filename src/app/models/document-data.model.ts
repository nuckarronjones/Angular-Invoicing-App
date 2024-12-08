//import { ITableUserInputs } from "../enums/invoice-table.enum";

// export let documentData = {
//   documentName: "",
//   currency: "PLN",
//   invoice:{
//     form: {
//       headerImage: "",
//       invoiceNo: "",
//       invoiceDate: "",
//       invoiceDueDate: "",
//       invoiceType: "",
//       seller: "",
//       sellerVAT: "",
//       sellerStreetNo: "",
//       sellerPostCode: "",
//       sellerCity: "",
//       sellerBankAcct: "",
//       sellerBank: "",
//       sellerSwift: "",
//       buyer: "",
//       buyerVAT: "",
//       buyerStreetNo: "",
//       buyerPostCode: "",
//       buyerCity: ""
//     },
//     formTable: [] as ITableUserInputs[],
//     totals: {
//       netTotal: "",
//       vatTotal: "",
//       grossTotal: "",
//     },
//   },
// };

//Dummy data for testing. When deployed to a prod environment remove the pre-filled data
export let documentData = {
  documentName: "",
  currency: "PLN",
  invoice:{
    form: {
      headerImage: "",
      invoiceNo: "INV-00123",
      invoiceDate: "2024-12-01",
      invoiceDueDate: "2024-12-15",
      invoiceType: "Sales",
      seller: "Sunrise Studio",
      sellerVAT: "PL1234567890",
      sellerStreetNo: "123 Main St",
      sellerPostCode: "01-234",
      sellerCity: "Warsaw",
      sellerBankAcct: "PL16102055588855577700000000",
      sellerBank: "Bank XYZ",
      sellerSwift: "XYZ123",
      buyer: "Acme Corporation",
      buyerVAT: "PL9876543210",
      buyerStreetNo: "456 Market St",
      buyerPostCode: "56-789",
      buyerCity: "Krakow"
    },
    formTable: [
      {
          "rowId": "eaed1963-e21b-41d8-a567-534cc491925a",
          "name": "IT Services October",
          "quantity": "40",
          "quantUnit": "hrs",
          "unitNetPrice": "54",
          "vatPercentage": "0",
          "totalNet": "2160",
          "totalGross": "2160"
      },
      {
          "rowId": "1739272f-d78b-4590-a147-90721c6228a4",
          "name": "IT Services November",
          "quantity": "40",
          "quantUnit": "hrs",
          "unitNetPrice": "54",
          "vatPercentage": "12",
          "totalNet": "2160",
          "totalGross": "2160"
      },
      {
          "rowId": "f37a5043-9923-4e57-8fd9-9c0cdf412342",
          "name": "IT Services December",
          "quantity": "40",
          "quantUnit": "hrs",
          "unitNetPrice": "54",
          "vatPercentage": "1",
          "totalNet": "2160",
          "totalGross": "2160"
      }
  ],
    totals: {
      netTotal: "",
      vatTotal: "",
      grossTotal: "",
    },
  },
};
