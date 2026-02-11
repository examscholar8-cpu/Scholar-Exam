
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  FINANCE_ADMIN = 'FINANCE_ADMIN',
  GROUP_ADMIN = 'GROUP_ADMIN',
  USER = 'USER'
}

export interface User {
  id: number;
  name: string;
  mobile: string;
  role: UserRole;
  staffId?: string;
  status: boolean;
  createdAt: string;
}

export interface Wallet {
  id: number;
  userId: number;
  type: 'MAIN' | 'STAFF' | 'GROUP' | 'CONSOLIDATED' | 'MANAGEMENT';
  balance: number;
}

export interface Transaction {
  id: number;
  fromWallet: number;
  toWallet: number;
  amount: number;
  type: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
}

export interface Group {
  id: number;
  leaderId: number;
  groupCode: string;
  totalMembers: number;
  name: string;
  location?: string;
}

export interface Invitation {
  id: number;
  groupId: number;
  groupName: string;
  invitedBy: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}

export interface Nominee {
  id: number;
  userId: number;
  name: string;
  relation: string;
  bankAccount: string;
  ifsc: string;
}

export interface Installment {
  id: number;
  groupId: number;
  userId: number;
  amount: number;
  installmentNo: number;
  status: 'UNPAID' | 'PAID';
}
