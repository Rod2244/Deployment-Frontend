// Simple browser-based printing function
export const printReceipt = (orderData) => {
  // Create a new window for printing
  const printWindow = window.open('', '_blank', 'width=300,height=600');

  if (!printWindow) {
    alert('Please allow popups for printing');
    return;
  }

  // Generate receipt HTML
  const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Receipt</title>
      <style>
        body {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          line-height: 1.2;
          margin: 0;
          padding: 10px;
          width: 48mm; /* 58mm paper width minus margins */
          text-align: center;
        }
        .center { text-align: center; }
        .left { text-align: left; }
        .right { text-align: right; }
        .line { border-top: 1px dashed #000; margin: 5px 0; }
        .item-row {
          display: flex;
          justify-content: space-between;
          margin: 2px 0;
        }
        .total-row {
          font-weight: bold;
          border-top: 1px solid #000;
          padding-top: 5px;
          margin-top: 5px;
        }
      </style>
    </head>
    <body>
      <div class="center">
        🍔 Food Paradise POS<br>
        Pasonanca, Zamboanga City<br>
        Contact: +63 111 222 4444<br>
        <strong>SALES INVOICE</strong>
      </div>
      <div class="line"></div>
      <div class="left">
        Time: ${orderData.date}<br>
        Receipt No: #${orderData.orderId}<br>
        Order Type: ${orderData.orderType}<br>
        Payment: ${orderData.paymentMethod}
      </div>
      <div class="line"></div>
      <div class="left">
        <strong>Qty  Item             Price</strong>
      </div>
      <div class="line"></div>
      ${orderData.cart.map(item => `
        <div class="item-row">
          <span>${item.qty}</span>
          <span>${item.item.substring(0, 16)}</span>
          <span>₱${(item.qty * item.price).toFixed(2)}</span>
        </div>
        <div class="left" style="font-size: 10px; margin-left: 20px;">
          @ ₱${item.price.toFixed(2)}
        </div>
      `).join('')}
      <div class="line"></div>
      <div class="item-row">
        <span>Subtotal:</span>
        <span>₱${orderData.total.toFixed(2)}</span>
      </div>
      ${orderData.paymentMethod === "Cash" ? `
        <div class="item-row">
          <span>Given:</span>
          <span>₱${parseFloat(orderData.given).toFixed(2)}</span>
        </div>
        <div class="item-row">
          <span>Change:</span>
          <span>₱${parseFloat(orderData.change).toFixed(2)}</span>
        </div>
      ` : ''}
      <div class="item-row total-row">
        <span>TOTAL:</span>
        <span>₱${orderData.total.toFixed(2)}</span>
      </div>
      <div class="line"></div>
      <div class="center">
        Thank you for dining!<br>
        This is not an official receipt
      </div>
      <br><br><br>
    </body>
    </html>
  `;

  printWindow.document.write(receiptHTML);
  printWindow.document.close();

  // Wait for content to load then print
  printWindow.onload = () => {
    printWindow.print();
    // Close the window after printing (optional)
    setTimeout(() => {
      printWindow.close();
    }, 1000);
  };
};