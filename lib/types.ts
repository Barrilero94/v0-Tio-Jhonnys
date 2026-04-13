export type Platform = "pedidosya" | "foodo" | "delivery" | "takeaway"

export type OrderStatus = "pending" | "preparing" | "ready" | "completed"

export interface OrderItem {
  name: string
  quantity: number
  notes?: string
}

export interface Order {
  id: string
  platform: Platform
  customerName: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: Date
  estimatedTime?: number // minutes
}
