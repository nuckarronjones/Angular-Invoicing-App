import { InvoiceFormKeys } from "../enums/invoice-document.enum";

interface InputField{
  id: InvoiceFormKeys,
  label: string,
  placeholder: string,
  inputType:  "date" | "text",
  style:  "w-100" | "w-50" | "w-50 inline-block",
  column: "left" | "right";
}

interface formFields{
  header: ReadonlyArray<InputField>,
  headerImage: string,
  body: ReadonlyArray<InputField>
}

export const formFields: formFields ={
    header: [
      {
        id: "invoiceNo",
        label: "Invoice No:",
        placeholder: "Enter Invoice No",
        inputType: "text",
        style: "w-50",
        column: "left"
      },
      {
        id: "invoiceDate",
        label: "Invoice Date:",
        placeholder: "",
        inputType: "date",
        style: "w-50",
        column: "left"
      },
      {
        id: "invoiceDueDate",
        label: "Invoice Due Date:",
        placeholder: "",
        inputType: "date",
        style: "w-50",
        column: "left"
      },
      {
        id: "invoiceType",
        label: "Invoice Type:",
        placeholder: "Enter Invoice Type",
        inputType: "text",
        style: "w-50",
        column: "left"
      },
    ],
    headerImage : "",
    body: [
      {
        id: "seller",
        label: "Seller:",
        placeholder: "Enter Seller Information",
        inputType: "text",
        style: "w-100",
        column: "left"
      },
      {
        id: "sellerVAT",
        label: "VAT ID:",
        placeholder: "Enter VAT",
        inputType: "text",
        style: "w-100",
        column: "left"
      },
      {
        id: "sellerStreetNo",
        label: "Street and No:",
        placeholder: "Enter Street and No",
        inputType: "text",
        style: "w-100",
        column: "left"
      },
      {
        id: "sellerPostCode",
        label: "Post Code:",
        placeholder: "Enter Post Code",
        inputType: "text",
        style: "w-50 inline-block",
        column: "left"
      },
      {
        id: "sellerCity",
        label: "City:",
        placeholder: "Enter City",
        inputType: "text",
        style: "w-50 inline-block",
        column: "left"
      },
      {
        id: "sellerBankAcct",
        label: "Bank Account:",
        placeholder: "Enter Bank Account",
        inputType: "text",
        style: "w-100",
        column: "left"
      },
      {
        id: "sellerBank",
        label: "Bank:",
        placeholder: "Enter Bank",
        inputType: "text",
        style: "w-50 inline-block",
        column: "left"
      },
      {
        id: "sellerSwift",
        label: "Swift:",
        placeholder: "Enter Swift",
        inputType: "text",
        style: "w-50 inline-block",
        column: "left"
      },
      {
        id: "buyer",
        label: "Buyer:",
        placeholder: "Enter Buyer Information",
        inputType: "text",
        style: "w-100",
        column: "right"
      },
      {
        id: "buyerVAT",
        label: "Buyer VAT ID:",
        placeholder: "Enter Buyer VAT",
        inputType: "text",
        style: "w-100",
        column: "right"
      },
      {
        id: "buyerStreetNo",
        label: "Buyer Street and No:",
        placeholder: "Enter Buyer Street and No",
        inputType: "text",
        style: "w-100",
        column: "right"
      },
      {
        id: "buyerPostCode",
        label: "Post Code:",
        placeholder: "Enter Post Code",
        inputType: "text",
        style: "w-50 inline-block",
        column: "right"
      },
      {
        id: "buyerCity",
        label: "City:",
        placeholder: "Enter City",
        inputType: "text",
        style: "w-50 inline-block",
        column: "right"
      },
    ],
  };