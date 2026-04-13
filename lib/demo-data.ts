import type { Order } from "./types"

export const demoOrders: Order[] = [
  // Pedidos Ya Orders
  {
    id: "PY-001",
    platform: "pedidosya",
    customerName: "Carlos M.",
    items: [
      { name: "Hamburguesa Clásica", quantity: 2 },
      { name: "Papas Fritas", quantity: 2 },
      { name: "Coca-Cola 500ml", quantity: 2 },
    ],
    total: 4500,
    status: "preparing",
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    estimatedTime: 25,
  },
  {
    id: "PY-002",
    platform: "pedidosya",
    customerName: "María L.",
    items: [
      { name: "Hamburguesa Doble Queso", quantity: 1 },
      { name: "Aros de Cebolla", quantity: 1 },
    ],
    total: 3200,
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    estimatedTime: 30,
  },
  {
    id: "PY-003",
    platform: "pedidosya",
    customerName: "Roberto S.",
    items: [
      { name: "Combo Familiar", quantity: 1, notes: "Sin pickles" },
    ],
    total: 8900,
    status: "completed",
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
  },
  // Foodo Orders
  {
    id: "FD-001",
    platform: "foodo",
    customerName: "Ana G.",
    items: [
      { name: "Hamburguesa BBQ", quantity: 3 },
      { name: "Papas Fritas Grandes", quantity: 2 },
      { name: "Sprite 500ml", quantity: 3 },
    ],
    total: 6800,
    status: "preparing",
    createdAt: new Date(Date.now() - 20 * 60 * 1000),
    estimatedTime: 20,
  },
  {
    id: "FD-002",
    platform: "foodo",
    customerName: "Juan P.",
    items: [
      { name: "Hamburguesa Veggie", quantity: 1 },
      { name: "Ensalada", quantity: 1 },
    ],
    total: 2900,
    status: "ready",
    createdAt: new Date(Date.now() - 35 * 60 * 1000),
  },
  {
    id: "FD-003",
    platform: "foodo",
    customerName: "Laura M.",
    items: [
      { name: "Hamburguesa Triple", quantity: 2 },
    ],
    total: 5400,
    status: "completed",
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
  },
  // Uber Eats Orders
  {
    id: "UE-001",
    platform: "ubereats",
    customerName: "Diego R.",
    items: [
      { name: "Hamburguesa Premium", quantity: 1 },
      { name: "Papas con Cheddar", quantity: 1 },
      { name: "Malteada Chocolate", quantity: 1 },
    ],
    total: 5200,
    status: "pending",
    createdAt: new Date(Date.now() - 3 * 60 * 1000),
    estimatedTime: 35,
  },
  {
    id: "UE-002",
    platform: "ubereats",
    customerName: "Patricia V.",
    items: [
      { name: "Hamburguesa Crispy", quantity: 2, notes: "Extra salsa" },
      { name: "Nuggets x12", quantity: 1 },
    ],
    total: 4800,
    status: "preparing",
    createdAt: new Date(Date.now() - 18 * 60 * 1000),
    estimatedTime: 22,
  },
  {
    id: "UE-003",
    platform: "ubereats",
    customerName: "Fernando B.",
    items: [
      { name: "Combo Kids", quantity: 2 },
    ],
    total: 3600,
    status: "ready",
    createdAt: new Date(Date.now() - 40 * 60 * 1000),
  },
  {
    id: "UE-004",
    platform: "ubereats",
    customerName: "Sofia T.",
    items: [
      { name: "Hamburguesa Bacon", quantity: 1 },
    ],
    total: 2800,
    status: "completed",
    createdAt: new Date(Date.now() - 55 * 60 * 1000),
  },
]
