"use client"

import { useState, useEffect } from "react"
import { Bell, RefreshCw } from "lucide-react"
import Image from "next/image"
import { PlatformColumn } from "./platform-column"
import { Button } from "@/components/ui/button"
import { demoOrders } from "@/lib/demo-data"
import type { Order, OrderStatus, Platform } from "@/lib/types"
import { cn } from "@/lib/utils"

const platformNames: Record<Platform, string> = {
  pedidosya: "PedidosYa",
  foodo: "Pedix",
  delivery: "Delivery",
  takeaway: "Take Away",
}

export function OrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>(demoOrders)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [activePlatform, setActivePlatform] = useState<Platform>("pedidosya")

  // Initialize and update clock only on client
  useEffect(() => {
    setCurrentTime(new Date())
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

  const handleAddOrder = (platform: Platform) => {
    // In a real app, this would open a modal to create a new order
    // For now, we'll add a demo order
    const newOrder: Order = {
      id: `${platform === "delivery" ? "DL" : "TA"}-${String(Date.now()).slice(-3)}`,
      platform,
      customerName: "Nuevo Cliente",
      items: [{ name: "Johnny's Clasica", quantity: 1 }],
      total: 2500,
      status: "pending",
      createdAt: new Date(),
      estimatedTime: 20,
    }
    setOrders((prev) => [newOrder, ...prev])
  }

  const handleRequestDelivery = (orderId: string) => {
    // In a real app, this would open a modal or call an API to request delivery
    // For now, just show an alert
    alert(`Solicitando delivery para pedido #${orderId}`)
  }

  const platforms: Platform[] = ["pedidosya", "foodo", "delivery", "takeaway"]

  const getOrdersByPlatform = (platform: Platform) =>
    orders.filter((order) => order.platform === platform)

  const activeOrdersCount = orders.filter((o) => o.status !== "completed").length
  const pendingCount = orders.filter((o) => o.status === "pending").length

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-3 py-3 md:px-6 md:py-4">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full flex-shrink-0">
            <Image
              src="/images/tio-johnnys-logo.jpg"
              alt="Tio Johnny's Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-base md:text-xl font-bold text-primary truncate">Tio Johnny&apos;s</h1>
            <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
              Premium Burgers - Centro de Pedidos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Stats - Mobile compact */}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="text-center">
              <p className="text-lg md:text-2xl font-bold">{activeOrdersCount}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground">Activos</p>
            </div>
            <div className="text-center">
              <p className="text-lg md:text-2xl font-bold text-amber-400">{pendingCount}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground">Pendientes</p>
            </div>
          </div>

          <div className="h-8 w-px bg-border hidden md:block" />

          {/* Clock - Hidden on mobile */}
          <div className="text-right hidden md:block">
            <p className="text-lg font-mono font-bold">
              {currentTime?.toLocaleTimeString("es-AR", {
                hour: "2-digit",
                minute: "2-digit",
              }) ?? "--:--"}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentTime?.toLocaleDateString("es-AR", {
                weekday: "short",
                day: "numeric",
                month: "short",
              }) ?? "---"}
            </p>
          </div>

          {/* Actions */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            className="relative h-8 w-8 md:h-10 md:w-10"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="relative h-8 w-8 md:h-10 md:w-10">
            <Bell className="h-4 w-4" />
            {pendingCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                {pendingCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Mobile Tabs */}
      <div className="flex md:hidden border-b border-border overflow-x-auto scrollbar-hide">
        {platforms.map((platform) => {
          const platformOrders = getOrdersByPlatform(platform)
          const activeCount = platformOrders.filter((o) => o.status !== "completed").length
          return (
            <button
              key={platform}
              onClick={() => setActivePlatform(platform)}
              className={cn(
                "flex-1 min-w-[80px] px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative",
                activePlatform === platform
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{platformNames[platform]}</span>
              {activeCount > 0 && (
                <span className={cn(
                  "ml-1.5 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                  activePlatform === platform ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {activeCount}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Mobile Content - Single Column */}
      <main className="flex-1 overflow-hidden md:hidden">
        <div className="h-full overflow-y-auto">
          <PlatformColumn
            platform={activePlatform}
            orders={getOrdersByPlatform(activePlatform)}
            onStatusChange={handleStatusChange}
            onAddOrder={() => handleAddOrder(activePlatform)}
            onRequestDelivery={handleRequestDelivery}
          />
        </div>
      </main>

      {/* Desktop Content - 4 Columns */}
      <main className="hidden md:flex flex-1 gap-4 overflow-hidden p-4">
        {platforms.map((platform) => (
          <div
            key={platform}
            className="flex-1 rounded-lg border border-border bg-card overflow-hidden"
          >
            <PlatformColumn
              platform={platform}
              orders={getOrdersByPlatform(platform)}
              onStatusChange={handleStatusChange}
              onAddOrder={() => handleAddOrder(platform)}
              onRequestDelivery={handleRequestDelivery}
            />
          </div>
        ))}
      </main>
    </div>
  )
}
