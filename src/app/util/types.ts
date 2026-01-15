export interface User {
  id: string;
  fullName: string;
  role: string;
  email: string;
  phoneNumber: string;
  referralCode: null;
  createdAt: Date;
  referralLink: string;
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
  phone: string;
  isChecked: boolean;
}

export interface recentTransactions {
  amount: number;
  purpose: string;
  type: string;
  createdAt: Date;
}
export interface basePackageInterface {
  plan: string;
  planCode: string;
}
export interface examPackage extends basePackageInterface {
  id: string;
  network: string;
  priceApi: number;
  sellingPrice: number;
  isActive: boolean;
}

export interface TvPackage extends basePackageInterface {
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
  code: number;
  customer_Name: any;
  address: string;
  meterNumber: string;
}
export interface AllUsersResponse {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  data: UsersForAdmin[];
}

export interface UsersForAdmin {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  roles: string[];
  walletBalance: number;
  totalTransactionValue: number;
}

export interface agentOverViewForAdmin {
  // summary: Summary;
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  data: Agent[];
}

export interface Summary {
  totalAgents: number;
  approvedAgents: number;
  pendingWithdrawals: number;
}

export interface Agent {
  agentId: string;
  fullName: string;
  email: string;
  commissionRate: number;
  totalSales: number;
  bankName: string;
  accountNumber: string;
  pendingPayout: number;
  paymentStatus: string;
  isAgentApproved: boolean;
  isCommissionApproved: boolean;
}

export interface walletOverViewForAdmin {
  totalWalletBalance: number;
  todaysFunding: number;
  totalBorrowedFunds: number;
  recentTransactions: walletOverviewRecentTransaction[];
}

export interface walletOverviewRecentTransaction {
  userName: string;
  method: string;
  type: string;
  status: string;
  amount: number;
  date: string;
}

export interface AdminCommissionOverview {
  totalCommissionPaid: number;
  totalRewardPoints: number;
  currentCommissionRate: number;
  recentCommissionLogs: any[];
}

export interface AdminDashboard {
  totalUsers: number;
  activeUsers: number;
  totalAgents: number;
  activeAgents: number;
  revenueToday: number;
  revenueWeek: number;
  revenueMonth: number;
  pendingWithdrawals: number;
  totalCommissionThisMonth: number;
  totalTransactionsThisMonth: number;
}

export interface ServiceOverview {
  serviceType: string;
  totalTransactions: number;
  totalRevenue: number;
  averageProfitPercentage: string;
}

export interface AdminServices {
  result: ServiceOverview[];
}

// export interface SettingsExamPackage
