export interface AuthenticationCredentials {
  username: string;
  password: string;
}

export interface CreateUserRequestBody {
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface User {
  id: number;
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface CreateProductRequestBody {
  name: string;
  amount: string; // NUMBER?
  orderId: number; // CONFERIR SE É NECESSÁRIO NO REQUEST BODY
}

export interface Product {
  id: number;
  name: string;
  amount: string;
  orderId: number;
}

export interface OrderForRequests {
  id: number;
  userId: number;
}

export interface FullOrder {
  id: number;
  userId: number;
  productsIds: number[];
}

export interface NewOrder {
  productsIds: number[];
}

export interface NewOrderFulfilled {
  userId: number;
  productsIds: number[];
}