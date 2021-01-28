$("document")
    .ready(function() {

        var viewModel =
            (window.viewModel = {

                data: {

                    dataList: ko.observable(),

                    employee_name: ko.observable(),
                    designation: ko.observable(),
                    date_of_joining: ko.observable(),
                    pay_period: ko.observable(),
                    pay_date: ko.observable(),
                    pay_acc_number: ko.observable(),
                    uan_number: ko.observable(),

                    earning_type: ko.observable(),
                    earning_value: ko.observable(),
                    deduction_type: ko.observable(),
                    deduction_value: ko.observable(),
                    reimburshment_type: ko.observable(),
                    reimburshment_value: ko.observable(),

                    earning: ko.observableArray([]),
                    deduction: ko.observableArray([]),
                    reimburshment: ko.observableArray([]),

                    gross_earning: ko.observable(),
                    total_deduction: ko.observable(),
                    total_reimburshment: ko.observable(),
                    net_payable: ko.observable(),
                    net_payable_inwords: ko.observable(),

                    currencyList: ko.observableArray(["$", "₹", "€"]),
                    selectedCurrency: ko.observable(),
                    paid_days: ko.observable(),
                    lop_days: ko.observable()




                },
                clickHandler: {
                    onSaveButtonClicked: function onSaveButtonClicked() {
                        viewModel.helper.saveData();




                    },
                    generatePdf: function generatePdf() {
                        // let doc = new jsPDF({
                        //     orientation: "l",
                        //     format: [854, 854],


                        // });



                        // let data = document.querySelector('#pdfgenerate');
                        // doc.fromHTML(data, 15, 15);
                        // // doc.autoPrint({ variant: 'non-conform' });
                        // doc.save("output.pdf");

                        const salary_slip = document.getElementById("pdfgenerate");

                        var opt = {
                            margin: 1,
                            filename: 'myfile.pdf',
                            image: { type: 'jpeg', quality: 0.98 },
                            html2canvas: { scale: 2 },
                            jsPDF: { unit: 'in', format: "a3", orientation: 'portrait' }
                        };

                        html2pdf().from(salary_slip).set(opt).save();
                    },

                    AddEarningBttonIsClicked: function AddEarningBttonIsClicked() {
                        let data = {
                            Earning_type: viewModel.data.earning_type(),
                            Earning_value: viewModel.data.earning_value()
                        }

                        viewModel.data.earning.push(data);

                        console.log(viewModel.data.earning())

                    },
                    AddDeductionBttonIsClicked: function AddDeductionBttonIsClicked() {
                        let data = {
                            Deduction_type: viewModel.data.deduction_type(),
                            Deduction_value: viewModel.data.deduction_value()
                        }

                        viewModel.data.deduction.push(data);

                    },
                    AddReimburshmentBttonIsClicked: function AddReimburshmentBttonIsClicked() {
                        let data = {
                            Reimburshment_type: viewModel.data.reimburshment_type(),
                            Reimburshment_value: viewModel.data.reimburshment_value()
                        }

                        viewModel.data.reimburshment.push(data);

                    },
                    removeEarning: function removeEarning(value) {
                        viewModel.data.earning.remove(value);



                    },
                    removeDeduction: function removeDeduction(value) {
                        viewModel.data.deduction.remove(value);



                    },
                    removeReimburshment: function removeReimburshment(value) {
                        viewModel.data.reimburshment.remove(value);



                    }




                },
                states: {

                },
                helper: {
                    saveData: function saveData() {
                        let data = {
                            Employee_name: viewModel.data.employee_name(),
                            Designation: viewModel.data.designation(),
                            Date_of_joining: viewModel.data.date_of_joining(),
                            Pay_period: viewModel.data.pay_period(),
                            Pay_date: viewModel.data.pay_date(),
                            Pay_acc_number: viewModel.data.pay_acc_number(),
                            Uan_number: viewModel.data.uan_number(),

                            Earning: viewModel.data.earning(),
                            Deduction: viewModel.data.deduction(),
                            Reimburshment: viewModel.data.reimburshment(),

                            SelectedCurrency: viewModel.data.selectedCurrency(),
                            Paid_days: viewModel.data.paid_days(),
                            Lop_days: viewModel.data.lop_days()

                        }

                        console.log(data);


                        let serialized_data = JSON.stringify(data);

                        window.localStorage.setItem('employee_data_list', serialized_data);

                        window.location.href = "PrintData.html";


                    },


                    loadData: function loadData(element = {}) {

                        viewModel.data.employee_name(element.Employee_name);
                        viewModel.data.designation(element.Designation);
                        viewModel.data.date_of_joining(element.Date_of_joining);
                        viewModel.data.pay_period(element.Pay_period);
                        viewModel.data.pay_date(element.Pay_date);
                        viewModel.data.pay_acc_number(element.Pay_acc_number);
                        viewModel.data.uan_number(element.Uan_number);

                        viewModel.data.earning(element.Earning);
                        viewModel.data.deduction(element.Deduction);
                        viewModel.data.reimburshment(element.Reimburshment);

                        viewModel.data.selectedCurrency(element.SelectedCurrency),
                            viewModel.data.paid_days(element.Paid_days),
                            viewModel.data.lop_days(element.Lop_days)



                    },

                    loadPrintPage: function loadPrintPage() {

                        let localdata = window.localStorage.getItem('employee_data_list');

                        let newparseddata = JSON.parse(localdata);

                        console.log(newparseddata);

                        viewModel.helper.loadData(newparseddata);

                    },

                    CalculateGrossEarning: function CalculateGrossEarning() {


                        let total = 0;

                        const reducer = (accumulator, currentValue) => {

                            return accumulator + parseInt(currentValue.Earning_value);

                        }
                        total = viewModel.data.earning().reduce(reducer, 0);

                        console.log(viewModel.data.earning());
                        viewModel.data.gross_earning(total);


                    },

                    CalculateTotalDeduction: function CalculateTotalDeduction() {

                        let total = 0;

                        const reducer = (accumulator, currentValue) => {

                            return accumulator + parseInt(currentValue.Deduction_value);

                        }
                        total = viewModel.data.deduction().reduce(reducer, 0);


                        viewModel.data.total_deduction(total);

                    },

                    CalculateTotalReimburshment: function CalculateTotalReimburshment() {

                        let total = 0;

                        const reducer = (accumulator, currentValue) => {

                            return accumulator + parseInt(currentValue.Reimburshment_value);

                        }
                        total = viewModel.data.reimburshment().reduce(reducer, 0);


                        viewModel.data.total_reimburshment(total);

                    },
                    CalculateNetPayable: function CalculateNetPayable() {

                        let total = 0;

                        total = viewModel.data.gross_earning() + viewModel.data.total_reimburshment() - viewModel.data.total_deduction();

                        viewModel.data.net_payable(total);

                    },

                    NetPayableInWords: function NetPayableInWords() {
                        let netPayble = viewModel.data.net_payable();

                        let NetPayableInWords = toWords(netPayble);

                        viewModel.data.net_payable_inwords(NetPayableInWords);
                    }



                }
            })



        viewModel.helper.loadPrintPage();
        viewModel.helper.CalculateGrossEarning();
        viewModel.helper.CalculateTotalDeduction();
        viewModel.helper.CalculateTotalReimburshment();
        viewModel.helper.CalculateNetPayable();
        viewModel.helper.NetPayableInWords();



        ko.applyBindings(viewModel);






    });