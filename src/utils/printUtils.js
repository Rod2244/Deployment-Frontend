import qz from "qz-tray";

export const printReceipt = async (orderData) => {
  try {
    console.log("Connecting to QZ Tray...");
    await qz.websocket.connect();

    const receipt = [
      '\x1B\x40',
      '\x1B\x61\x01',
      '*** Food Paradise POS ***\n',
      'Pasonanca, Zamboanga City\n',
      'Contact: +63 111 222 4444\n',
      'SALES INVOICE\n',
      '-------------------------------\n',
      '\x1B\x61\x00',
      `Time: ${orderData.date}\n`,
      `Receipt No: #${orderData.orderId}\n`,
      `Order Type: ${orderData.orderType}\n`,
      `Payment: ${orderData.paymentMethod}\n`,
      '-------------------------------\n',
      'Qty  Item                  Price\n',
      '-------------------------------\n'
    ];

    orderData.cart.forEach(item => {
      const total = item.qty * item.price;
      receipt.push(`${item.qty} ${item.item} ₱${total.toFixed(2)}\n`);
    });

    receipt.push('-------------------------------\n');
    receipt.push(`TOTAL: ₱${orderData.total.toFixed(2)}\n`);
    receipt.push('\n\n\n');

    // open serial connection
    await qz.serial.open({
      port: 'COM6',
      baudRate: 9600,
      dataBits: 8,
      stopBits: 1,
      parity: 'none'
    });

    // send receipt
    await qz.serial.send(receipt.join(''));

    // close serial
    await qz.serial.close();

    console.log("Print successful");

  } catch (err) {
    console.error("Print failed:", err);
  }
};