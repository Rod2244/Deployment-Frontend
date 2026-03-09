// Simple browser-based printing function
export const printReceipt = (orderData) => {
  console.log("🖨️ Starting print process...", orderData);

  // Create an iframe for printing
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

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
          width: 48mm;
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
        @media print {
          body { width: auto; }
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

  iframeDoc.open();
  iframeDoc.write(receiptHTML);
  iframeDoc.close();

  // Wait for content to load then print
  iframe.onload = () => {
    console.log("🖨️ Content loaded, calling print...");
    iframe.contentWindow.print();
    // Remove iframe after printing
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  // Fallback if onload doesn't fire
  setTimeout(() => {
    if (document.body.contains(iframe)) {
      console.log("🖨️ Fallback print call...");
      iframe.contentWindow.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }
  }, 500);
};