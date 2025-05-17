export interface OrderSequence {
  priority: number;
  text: string;
  description: string;
}

export function getOrderSequence(order: any): OrderSequence[] {
  const sequence = [];
  if (Boolean(order.is_validate_buyer)) {
    sequence.push({
      priority: 1,
      text: "Menunggu verifikasi oleh penjual agar order dapat diproses",
      description:
        "Menunggu konfirmasi dari penjual untuk memverifikasi order sehingga dapat diproses.",
    });
  }
  if (Boolean(order.is_validate_seller)) {
    sequence.push({
      priority: 2,
      text: "Order berhasil terverifikasi oleh penjual",
      description:
        "Order telah diverifikasi oleh penjual dan siap untuk diproses.",
    });
  }

  if (Boolean(order.is_shipping)) {
    sequence.push({
      priority: 3,
      text: "Order berhasil dikirim oleh penjual",
      description:
        "Order telah dikirim oleh penjual dan sedang dalam perjalanan menuju tujuan.",
    });
  }

  if (Boolean(order.is_shipped)) {
    sequence.push({
      priority: 4,
      text: "Order telah sampai tujuan",
      description: "Order telah sampai pada alamat yang dituju.",
    });
  }

  if (Boolean(order.is_received)) {
    sequence.push({
      priority: 5,
      text: "Order berhasil diterima",
      description: "Order telah diterima oleh pembeli.",
    });
  }

  return sequence;
}

export function getOrderStatus(order: any): any {
  const isValidateBuyer = order.attributes.is_validate_buyer;
  const isValidateSeller = order.attributes.is_validate_seller;
  const isShipping = order.attributes.is_shipping;
  const isShipped = order.attributes.is_shipped;
  const isReceived = order.attributes.is_received;

  if (isReceived) {
    return {
      text: "Selesai",
      color: "success",
    };
  }

  if (isShipped) {
    return {
      text: "Sampai Tujuan",
      color: "success",
    };
  }

  if (isShipping) {
    return {
      text: "Dalam Pengiriman",
      color: "info",
    };
  }

  if (isValidateSeller) {
    return {
      text: "Terverifikasi Penjual",
      color: "secondary",
    };
  } else if (isValidateBuyer) {
    return {
      text: "Menunggu Verifikasi Penjual",
      color: "primary",
    };
  }

  return {
    text: "Belum Terverifikasi Pembeli",
    color: "warning",
  };
}
