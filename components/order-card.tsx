"use client"

import { Clock, Check, ChefHat, Package, User } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Order, OrderStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

interface OrderCardProps {
  order: Order
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void
}

const statusConfig: Record<
  OrderStatus,
  { label: string; icon: React.ElementType; className: string }
> = {
  pending: {
    label: "Pendiente",
    icon: Clock,
    className: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  preparing: {
    label: "Preparando",
    icon: ChefHat,
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  ready: {
    label: "Listo",
    icon: Package,
    className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  completed: {
    label: "Entregado",
    icon: Check,
    className: "bg-muted text-muted-foreground border-muted",
  },
}

function getNextStatus(current: OrderStatus): OrderStatus | null {
  const flow: Record<OrderStatus, OrderStatus | null> = {
    pending: "preparing",
    preparing: "ready",
    ready: "completed",
    completed: null,
  }
  return flow[current]
}

function getTimeAgo(date: Date): string {
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
  if (minutes < 1) return "Ahora"
  if (minutes === 1) return "Hace 1 min"
  if (minutes < 60) return `Hace ${minutes} min`
  const hours = Math.floor(minutes / 60)
  return `Hace ${hours}h`
}

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const status = statusConfig[order.status]
  const StatusIcon = status.icon
  const nextStatus = getNextStatus(order.status)
  const isCompleted = order.status === "completed"

  return (
    <Card
      className={cn(
        "transition-all duration-200 border-l-4",
        isCompleted ? "opacity-60" : "hover:ring-2 hover:ring-ring/50",
        order.platform === "pedidosya" && "border-l-pedidosya",
        order.platform === "foodo" && "border-l-foodo",
        order.platform === "delivery" && "border-l-delivery",
        order.platform === "takeaway" && "border-l-takeaway"
      )}
    >
      <CardHeader className="p-3 pb-2 md:p-4 md:pb-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
            <span className="font-mono text-xs md:text-sm font-semibold text-muted-foreground">
              #{order.id}
            </span>
            <Badge variant="outline" className={cn("text-[10px] md:text-xs px-1.5 py-0.5", status.className)}>
              <StatusIcon className="mr-1 h-2.5 w-2.5 md:h-3 md:w-3" />
              {status.label}
            </Badge>
          </div>
          <span className="text-[10px] md:text-xs text-muted-foreground flex-shrink-0">
            {getTimeAgo(order.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <User className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
          <span className="font-medium text-sm md:text-base truncate">{order.customerName}</span>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0 md:p-4 md:pt-0 space-y-2 md:space-y-3">
        <ul className="space-y-0.5 md:space-y-1">
          {order.items.map((item, idx) => (
            <li key={idx} className="text-xs md:text-sm">
              <span className="font-medium">{item.quantity}x</span>{" "}
              <span className="text-foreground">{item.name}</span>
              {item.notes && (
                <span className="ml-1 md:ml-2 text-[10px] md:text-xs text-amber-400">
                  ({item.notes})
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-border pt-2 md:pt-3">
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-bold">
              ${order.total.toLocaleString("es-AR")}
            </span>
            {order.estimatedTime && !isCompleted && (
              <span className="text-[10px] md:text-xs text-muted-foreground">
                ~{order.estimatedTime} min
              </span>
            )}
          </div>
          {nextStatus && (
            <Button
              size="sm"
              onClick={() => onStatusChange(order.id, nextStatus)}
              className="font-medium text-xs md:text-sm h-8 md:h-9 px-3 md:px-4"
            >
              {nextStatus === "preparing" && "Preparar"}
              {nextStatus === "ready" && "Listo"}
              {nextStatus === "completed" && "Entregar"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
