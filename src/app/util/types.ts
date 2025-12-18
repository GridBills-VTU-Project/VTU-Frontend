export interface User {
  id: string;
  fullName: string;
  role: string;
  email: string;
  phoneNumber: string;
  referralCode: null;
  createdAt: Date;
  referralLink:string;
}

export interface registerForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  referral_code: string;
  isChecked: boolean;
}

export interface DataArray {
  planId: string;
  network: string;
  name: string;
  sellingPrice: number;
  providerCode: string;
  description: string;
}
export interface ElectricityPurchaseForm {
  meterType: string;
  meterNum: string;
  servicID: string;
  amount: string;
  phone:string;
  isChecked: boolean;
}

export interface recentTransactions {
  amount: number;
  purpose: string;
  type: string;
  createdAt: Date;
}
export interface baseInterface {
  plan: string;
  planCode: string;
}
export interface examPackage extends baseInterface {
  id: string;
  network: string;
  priceApi: number;
  sellingPrice: number;
  isActive: boolean;
}

export interface TvPackage extends baseInterface {
  amount: string;
}

export interface CardPin {
  network: string;
  pin: string;
  serial: string;
  dial: string;
  customercare: string;
  cardname: string;
  amount: string;
  date: string;
  logo: string;
}

export interface ValidateMeterRes {
  code: number
  customer_Name: any
  address: string
  meterNumber: string
}

export interface UserDetails{
  full_name:string;
  status:string;
  wallet_balance:string;
  total_transactions:string;
  actions:string;
}
