interface OrderAttributes {
  code: string;
  order_type: string;
  snap_token: string | null;
  airwaybill: string;
  payments_type: string;
  buyer_name: string | null;
  price_amount: number;
  is_validate_seller: boolean;
  is_validate_buyer: boolean;
  is_shipping: boolean;
  is_shipped: boolean;
  is_received: boolean;
  createdAt: string;
  updatedAt: string;
}

interface OrderDetailsLinks {
  related: string;
  self: string;
}

interface DestinationUsersLinks {
  related: string;
  self: string;
}

interface DestinationUserData {
  type: string;
  id: string;
}

interface OriginUsersLinks {
  related: string;
  self: string;
}

interface OrderRelationships {
  "order-details": {
    links: OrderDetailsLinks;
  };
  "destination-users": {
    links: DestinationUsersLinks;
    data: DestinationUserData;
  };
  "origin-users": {
    links: OriginUsersLinks;
  };
}

interface OrderLinks {
  self: string;
}

interface OrderData {
  type: string;
  id: string;
  attributes: OrderAttributes;
  relationships: OrderRelationships;
  links: OrderLinks;
}

interface OrderResponse {
  data: OrderData;
}
