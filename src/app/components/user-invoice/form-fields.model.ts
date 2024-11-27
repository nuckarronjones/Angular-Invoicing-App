export let formFields  ={
    header: [
      {
        id: "invoiceNo",
        label: "Invoice No:",
        placeholder: "Enter Invoice No",
        inputType: "text",
        style: "w-50",
        column: "left",
        value: "",
        setValue(input: Event) {
          this.value = input.toString();
        },
      },
      {
        id: "invoiceDate",
        label: "Invoice Date:",
        placeholder: "",
        inputType: "date",
        style: "w-50",
        column: "left",
        value: "",
        setValue(input: Event) {
          this.value = input.toString();
        },
      },
      {
        id: "invoiceDueDate",
        label: "Invoice Due Date:",
        placeholder: "",
        inputType: "date",
        style: "w-50",
        column: "left",
        value: "",
        setValue(input: Event) {
          this.value = input.toString();
        },
      },
      {
        id: "invoiceType",
        label: "Invoice Type:",
        placeholder: "Enter Invoice Type",
        inputType: "text",
        style: "w-50",
        column: "left",
        value: "",
        setValue(input: Event) {
          this.value = input.toString();
        },
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
        column: "left",
        value: "",
        setValue(input: Event) {
          this.value = input.toString();
        },
      },
      {
        id: "VAT",
        label: "VAT ID:",
        placeholder: "Enter VAT",
        inputType: "text",
        style: "w-100",
        column: "left",
        value: "",
        setValue(input: Event) {
          this.value = 'VAT ID: ' + input.toString();
        },
      },
      {
        id: "streetNo",
        label: "Street and No:",
        placeholder: "Enter Street and No",
        inputType: "text",
        style: "w-100",
        column: "left",
        value: "",
        setValue(input: Event) {
          this.value = input.toString();
        },
      },
      {
        id: "postCode",
        label: "Post Code:",
        placeholder: "Enter Post Code",
        inputType: "text",
        style: "w-50 inline-block",
        column: "left",
        value: "",
        setValue(input: Event) {
          this.value = input.toString();
        },
      },
      {
        id: "sellerCity",
        label: "City:",
        placeholder: "Enter City",
        inputType: "text",
        style: "w-50 inline-block",
        column: "left",
        value: "",
        setValue(input: Event) {
          this.value = input.toString();
        },
      },
      {
        id: "bankAcct",
        label: "Bank Account:",
        placeholder: "Enter Bank Account",
        inputType: "text",
        style: "w-100",
        column: "left",
        value: "",
        setValue(input: Event) {
          this.value = 'Bank Acct: ' + input.toString();
        },
      },
      {
        id: "bank",
        label: "Bank:",
        placeholder: "Enter Bank",
        inputType: "text",
        style: "w-50 inline-block",
        column: "left",
        value: "",
        setValue(input: Event) {
          this.value = 'Bank: ' +input.toString();
        },
      },
      {
        id: "swift",
        label: "Swift:",
        placeholder: "Enter Swift",
        inputType: "text",
        style: "w-50 inline-block",
        column: "left",
        value: "",
        setValue(input: Event) {
          this.value = 'SWIFT: ' + input.toString();
        },
      },
      {
        id: "buyer",
        label: "Buyer:",
        placeholder: "Enter Buyer Information",
        inputType: "text",
        style: "w-100",
        column: "right",
        value: "",
        setValue(input: Event) {
          this.value = input.toString();
        },
      },
      {
        id: "buyerVAT",
        label: "Buyer VAT ID:",
        placeholder: "Enter Buyer VAT",
        inputType: "text",
        style: "w-100",
        column: "right",
        value: "",
        setValue(input: Event) {
          this.value = input.toString();
        },
      },
      {
        id: "buyerStreetNo",
        label: "Buyer Street and No:",
        placeholder: "Enter Buyer Street and No",
        inputType: "text",
        style: "w-100",
        column: "right",
        value: "",
        setValue(input: Event) {
          this.value = input.toString();
        },
      },
      {
        id: "postCode",
        label: "Post Code:",
        placeholder: "Enter Post Code",
        inputType: "text",
        style: "w-50 inline-block",
        column: "right",
        value: "",
        setValue(input: Event) {
          this.value = input.toString();
        },
      },
      {
        id: "buyerCity",
        label: "City:",
        placeholder: "Enter City",
        inputType: "text",
        style: "w-50 inline-block",
        column: "right",
        value: "",
        setValue(input: Event) {
          this.value = input.toString();
        },
      },
    ],
  };