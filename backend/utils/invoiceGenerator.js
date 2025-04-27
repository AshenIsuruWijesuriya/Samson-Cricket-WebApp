// utils/invoiceGenerator.js
const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');

const fonts = {
    Roboto: {
        normal: path.join(__dirname, '../fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../fonts/Roboto-MediumItalic.ttf')
    }
};

const printer = new PdfPrinter(fonts);

exports.generateInvoicePDF = async (order) => {
    // Read the logo file
    const logoPath = path.join(__dirname, '../logos/logo.png');
    let logoData = null;
    
    try {
        logoData = fs.readFileSync(logoPath).toString('base64');
    } catch (error) {
        console.warn('Logo file not found, proceeding without logo');
    }

    const documentDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
            // Header Section
            {
                columns: [
                    // Logo Column
                    ...(logoData ? [{
                        image: `data:image/png;base64,${logoData}`,
                        width: 100,
                        alignment: 'left'
                    }] : []),
                    // Company Info Column
                    {
                        width: '*',
                        text: [
                            { text: 'SAMSON CRICKET', style: 'companyName' },
                            { text: '\n123 Cricket Lane', style: 'companyAddress' },
                            { text: '\nColombo, Sri Lanka', style: 'companyAddress' },
                            { text: '\nPhone: +94 11 234 5678', style: 'companyAddress' },
                            { text: '\nEmail: info@samsoncricket.com', style: 'companyAddress' }
                        ],
                        alignment: 'right'
                    }
                ],
                margin: [0, 0, 0, 30]
            },
            // Invoice Title
            {
                text: 'INVOICE',
                style: 'invoiceTitle',
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },
            // Invoice Details Section
            {
                columns: [
                    // Customer Details
                    {
                        width: '50%',
                        stack: [
                            {
                                text: 'BILL TO',
                                style: 'sectionHeader',
                                margin: [0, 0, 0, 10]
                            },
                            {
                                text: `${order.firstName} ${order.lastName}`,
                                style: 'customerName',
                                margin: [0, 0, 0, 5]
                            },
                            {
                                text: order.deliveryAddress,
                                style: 'customerAddress',
                                margin: [0, 0, 0, 5]
                            },
                            {
                                text: `Phone: ${order.phoneNumber}`,
                                style: 'customerAddress',
                                margin: [0, 0, 0, 5]
                            }
                        ]
                    },
                    // Invoice Details
                    {
                        width: '50%',
                        stack: [
                            {
                                text: 'INVOICE DETAILS',
                                style: 'sectionHeader',
                                margin: [0, 0, 0, 10]
                            },
                            {
                                columns: [
                                    {
                                        width: '40%',
                                        text: 'Order ID:',
                                        style: 'invoiceLabel'
                                    },
                                    {
                                        width: '60%',
                                        text: order._id.toString(),
                                        style: 'invoiceValue'
                                    }
                                ],
                                margin: [0, 0, 0, 5]
                            },
                            {
                                columns: [
                                    {
                                        width: '40%',
                                        text: 'Invoice Date:',
                                        style: 'invoiceLabel'
                                    },
                                    {
                                        width: '60%',
                                        text: new Date(order.orderDate).toLocaleDateString(),
                                        style: 'invoiceValue'
                                    }
                                ],
                                margin: [0, 0, 0, 5]
                            },
                            {
                                columns: [
                                    {
                                        width: '40%',
                                        text: 'Payment Method:',
                                        style: 'invoiceLabel'
                                    },
                                    {
                                        width: '60%',
                                        text: order.paymentMethod,
                                        style: 'invoiceValue'
                                    }
                                ],
                                margin: [0, 0, 0, 5]
                            }
                        ]
                    }
                ],
                margin: [0, 0, 0, 30]
            },
            // Items Table
            {
                table: {
                    headerRows: 1,
                    widths: ['*', 'auto', 'auto', 'auto'],
                    body: [
                        [
                            { text: 'DESCRIPTION', style: 'tableHeader' },
                            { text: 'QTY', style: 'tableHeader', alignment: 'center' },
                            { text: 'PRICE', style: 'tableHeader', alignment: 'right' },
                            { text: 'AMOUNT', style: 'tableHeader', alignment: 'right' }
                        ],
                        ...order.items.map(item => {
                            let itemDescription;
                            if (item.productModel === 'Merchandise') {
                                itemDescription = item.productId && item.productId.name 
                                    ? item.productId.name 
                                    : 'Merchandise Item';
                            } else {
                                itemDescription = item.productId && typeof item.productId === 'object' 
                                    ? `${item.productId.brand || 'N/A'} ${item.productId.model || 'N/A'}`
                                    : `${item.productModel} Item`;
                            }
                            
                            return [
                                { 
                                    text: `${itemDescription} (${item.productModel})`,
                                    style: 'tableContent' 
                                },
                                { text: item.quantity, style: 'tableContent', alignment: 'center' },
                                { text: `LKR ${item.price.toFixed(2)}`, style: 'tableContent', alignment: 'right' },
                                { text: `LKR ${(item.quantity * item.price).toFixed(2)}`, style: 'tableContent', alignment: 'right' }
                            ];
                        })
                    ]
                },
                layout: {
                    hLineWidth: function(i, node) { return (i === 0 || i === node.table.body.length) ? 1 : 0.5; },
                    vLineWidth: function(i) { return 0; },
                    hLineColor: function(i) { return '#aaaaaa'; },
                    paddingLeft: function(i) { return 10; },
                    paddingRight: function(i) { return 10; },
                    paddingTop: function(i) { return 5; },
                    paddingBottom: function(i) { return 5; }
                }
            },
            // Total Section
            {
                table: {
                    widths: ['*', 'auto'],
                    body: [
                        [
                            { text: 'Payment Details:', style: 'paymentDetail' },
                            { text: `Card ending in ****${order.paymentDetails.cardNumber.slice(-4)}`, style: 'paymentDetail', alignment: 'right' }
                        ],
                        [
                            { text: 'Expiry Date:', style: 'paymentDetail' },
                            { text: order.paymentDetails.expiryDate, style: 'paymentDetail', alignment: 'right' }
                        ],
                        [
                            { text: 'TOTAL AMOUNT:', style: 'totalAmount' },
                            { text: `LKR ${order.totalAmount.toFixed(2)}`, style: 'totalAmount', alignment: 'right' }
                        ]
                    ]
                },
                layout: {
                    hLineWidth: function(i) { return 0; },
                    vLineWidth: function(i) { return 0; },
                    paddingLeft: function(i) { return 0; },
                    paddingRight: function(i) { return 0; },
                    paddingTop: function(i) { return 5; },
                    paddingBottom: function(i) { return 5; }
                },
                margin: [0, 20, 0, 0]
            },
            // Footer
            {
                text: [
                    { text: 'Thank you for your business!\n', style: 'footer' },
                    { text: 'Terms & Conditions:\n', style: 'footerBold' },
                    { text: '1. All items are subject to availability\n', style: 'footer' },
                    { text: '2. Returns accepted within 14 days of purchase\n', style: 'footer' },
                    { text: '3. For any queries, please contact our customer service', style: 'footer' }
                ],
                alignment: 'center',
                margin: [0, 30, 0, 0]
            }
        ],
        styles: {
            companyName: {
                fontSize: 16,
                bold: true,
                color: '#333333'
            },
            companyAddress: {
                fontSize: 10,
                color: '#666666'
            },
            invoiceTitle: {
                fontSize: 24,
                bold: true,
                color: '#333333'
            },
            sectionHeader: {
                fontSize: 12,
                bold: true,
                color: '#333333',
                decoration: 'underline'
            },
            customerName: {
                fontSize: 12,
                bold: true,
                color: '#333333'
            },
            customerAddress: {
                fontSize: 10,
                color: '#666666'
            },
            invoiceDetail: {
                fontSize: 10,
                margin: [0, 0, 0, 5]
            },
            tableHeader: {
                fontSize: 10,
                bold: true,
                color: '#333333'
            },
            tableContent: {
                fontSize: 10
            },
            paymentDetail: {
                fontSize: 10,
                color: '#666666'
            },
            totalAmount: {
                fontSize: 12,
                bold: true,
                color: '#333333'
            },
            footer: {
                fontSize: 9,
                color: '#666666'
            },
            footerBold: {
                fontSize: 9,
                bold: true,
                color: '#333333'
            },
            invoiceLabel: {
                fontSize: 10,
                color: '#666666'
            },
            invoiceValue: {
                fontSize: 10,
                bold: true,
                color: '#333333'
            }
        }
    };

    const pdfDoc = printer.createPdfKitDocument(documentDefinition);
    return pdfDoc;
};