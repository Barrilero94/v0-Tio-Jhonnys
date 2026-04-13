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
        order.platform === "ubereats" && "border-l-ubereats"
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold text-muted-foreground">
              #{order.id}
            </span>
            <Badge variant="outline" className={cn("text-xs", status.className)}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {status.label}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">
            {getTimeAgo(order.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{order.customerName}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <ul className="space-y-1">
          {order.items.map((item, idx) => (
            <li key={idx} className="text-sm">
              <span className="font-medium">{item.quantity}x</span>{" "}
              <span className="text-foreground">{item.name}</span>
              {item.notes && (
                <span className="ml-2 text-xs text-amber-400">
                  ({item.notes})
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex flex-col">
            <span className="text-lg font-bold">
              ${order.total.toLocaleString("es-AR")}
            </span>
            {order.estimatedTime && !isCompleted && (
              <span className="text-xs text-muted-foreground">
                ~{order.estimatedTime} min
              </span>
            )}
          </div>
          {nextStatus && (
            <Button
              size="sm"
              onClick={() => onStatusChange(order.id, nextStatus)}
              className="font-medium"
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
