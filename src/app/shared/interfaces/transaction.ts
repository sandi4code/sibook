export interface Transaction {
  amount: number
  category_id: number
  category_name: string
  created_at: string
  credit_id: number
  date: string
  debt_id: number
  description: string
  id: number
  name: string
  type: string
  updated_at: string
  user_id: number
}

export interface TransactionFilter {
  month: string
  orderBy: string
  orderDir: string
  type: string
}

export interface TransactionRequest {
  month?: string
  orderBy?: string
  orderDir?: string
  type?: string
  page: number
  limit: number
}