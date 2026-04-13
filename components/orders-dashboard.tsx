"use client"

import { useState, useEffect } from "react"
import { Utensils, Bell, RefreshCw } from "lucide-react"
import { PlatformColumn } from "./platform-column"
import { Button } from "@/components/ui/button"
import { demoOrders } from "@/lib/demo-data"
import type { Order, OrderStatus, Platform } from "@/lib/types"

export function OrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>(demoOrders)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
  }

  const handleRefresh = () => {
    // In a real app, this would fetch fresh data from APIs
    setOrders(demoOrders)
  }

  const platforms: Platform[] = ["pedidosya", "foodo", "ubereats"]

  const getOrdersByPlatform = (platform: Platform) =>
    orders.filter((order) => order.platform === platform)

  const activeOrdersCount = orders.filter((o) => o.status !== "completed").length
  const pendingCount = orders.filter((o) => o.status === "pending").length

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Utensils className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Burger Command</h1>
            <p className="text-sm text-muted-foreground">
              Centro de Pedidos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Stats */}
          <div className="hidden items-center gap-6 md:flex">
            <div className="text-center">
              <p className="text-2xl font-bold">{activeOrdersCount}</p>
              <p className="text-xs text-muted-foreground">Activos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Pendientes</p>
            </div>
          </div>

          <div className="h-8 w-px bg-border" />

          {/* Clock */}
          <div className="text-right">
            <p className="text-lg font-mono font-bold">
              {currentTime.toLocaleTimeString("es-AR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentTime.toLocaleDateString("es-AR", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>

          {/* Actions */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            className="relative"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            {pendingCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                {pendingCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content - 3 Columns */}
      <main className="flex flex-1 gap-4 overflow-hidden p-4">
        {platforms.map((platform) => (
          <div
            key={platform}
            className="flex-1 rounded-lg border border-border bg-card overflow-hidden"
          >
            <PlatformColumn
              platform={platform}
              orders={getOrdersByPlatform(platform)}
              onStatusChange={handleStatusChange}
            />
          </div>
        ))}
      </main>
    </div>
  )
}
