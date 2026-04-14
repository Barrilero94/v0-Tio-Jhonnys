"use client"

import { Plus } from "lucide-react"
import { OrderCard } from "./order-card"
import { Button } from "@/components/ui/button"
import type { Order, OrderStatus, Platform } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PlatformColumnProps {
  platform: Platform
  orders: Order[]
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void
  onAddOrder?: () => void
}

const platformConfig: Record<
  Platform,
  { name: string; bgClass: string; borderClass: string }
> = {
  pedidosya: {
    name: "Pedidos Ya",
    bgClass: "bg-pedidosya/10",
    borderClass: "border-pedidosya",
  },
  foodo: {
    name: "Fu.do",
    bgClass: "bg-foodo/10",
    borderClass: "border-foodo",
  },
  delivery: {
    name: "Delivery",
    bgClass: "bg-delivery/10",
    borderClass: "border-delivery",
  },
  takeaway: {
    name: "Take Away",
    bgClass: "bg-takeaway/10",
    borderClass: "border-takeaway",
  },
}

export function PlatformColumn({
  platform,
  orders,
  onStatusChange,
  onAddOrder,
}: PlatformColumnProps) {
  const config = platformConfig[platform]
  const canAddOrders = platform === "delivery" || platform === "takeaway"
  
  // Separate active and completed orders
  const activeOrders = orders.filter((o) => o.status !== "completed")
  const completedOrders = orders.filter((o) => o.status === "completed")
  
  // Sort active orders by status priority and time
  const statusPriority: Record<OrderStatus, number> = {
    pending: 0,
    preparing: 1,
    ready: 2,
    completed: 3,
  }
  
  activeOrders.sort((a, b) => {
    const priorityDiff = statusPriority[a.status] - statusPriority[b.status]
    if (priorityDiff !== 0) return priorityDiff
    return a.createdAt.getTime() - b.createdAt.getTime()
  })

  return (
    <div className="flex flex-col h-full">
      {/* Header - Hidden on mobile since we have tabs */}
      <div
        className={cn(
          "sticky top-0 z-10 rounded-t-lg border-b-2 px-3 py-2 md:px-4 md:py-3 hidden md:block",
          config.bgClass,
          config.borderClass
        )}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base md:text-lg font-bold">{config.name}</h2>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-background px-2 py-0.5 text-xs md:text-sm font-semibold">
              {activeOrders.length} activos
            </span>
            {canAddOrders && onAddOrder && (
              <Button
                size="icon"
                onClick={onAddOrder}
                className="h-7 w-7 rounded-full bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 text-primary-foreground" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Add Button - Floating */}
      {canAddOrders && onAddOrder && (
        <div className="md:hidden p-2 border-b border-border">
          <Button
            onClick={onAddOrder}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Pedido
          </Button>
        </div>
      )}

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto p-2 md:p-3 space-y-2 md:space-y-3">
        {activeOrders.length === 0 && completedOrders.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-muted-foreground">
            Sin pedidos
          </div>
        ) : (
          <>
            {/* Active Orders */}
            {activeOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={onStatusChange}
              />
            ))}

            {/* Completed Orders Section */}
            {completedOrders.length > 0 && (
              <div className="pt-4">
                <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                  <div className="h-px flex-1 bg-border" />
                  <span>Completados ({completedOrders.length})</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                {completedOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={onStatusChange}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
