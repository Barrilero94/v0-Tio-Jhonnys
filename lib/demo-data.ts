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
  // Delivery Orders (pedidos propios de delivery)
  {
    id: "DL-001",
    platform: "delivery",
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
    id: "DL-002",
    platform: "delivery",
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
    id: "DL-003",
    platform: "delivery",
    customerName: "Fernando B.",
    items: [
      { name: "Combo Kids", quantity: 2 },
    ],
    total: 3600,
    status: "ready",
    createdAt: new Date(Date.now() - 40 * 60 * 1000),
  },
  {
    id: "DL-004",
    platform: "delivery",
    customerName: "Sofia T.",
    items: [
      { name: "Hamburguesa Bacon", quantity: 1 },
    ],
    total: 2800,
    status: "completed",
    createdAt: new Date(Date.now() - 55 * 60 * 1000),
  },
  // Take Away Orders (retiro en local)
  {
    id: "TA-001",
    platform: "takeaway",
    customerName: "Martín H.",
    items: [
      { name: "Hamburguesa Doble Bacon", quantity: 2 },
      { name: "Papas Fritas", quantity: 2 },
      { name: "Coca-Cola 500ml", quantity: 2 },
    ],
    total: 5800,
    status: "pending",
    createdAt: new Date(Date.now() - 8 * 60 * 1000),
    estimatedTime: 15,
  },
  {
    id: "TA-002",
    platform: "takeaway",
    customerName: "Lucía P.",
    items: [
      { name: "Hamburguesa Clásica", quantity: 1 },
      { name: "Aros de Cebolla", quantity: 1, notes: "Extra crocantes" },
    ],
    total: 3100,
    status: "preparing",
    createdAt: new Date(Date.now() - 12 * 60 * 1000),
    estimatedTime: 10,
  },
  {
    id: "TA-003",
    platform: "takeaway",
    customerName: "Nicolás F.",
    items: [
      { name: "Combo Triple", quantity: 1 },
      { name: "Malteada Frutilla", quantity: 1 },
    ],
    total: 4200,
    status: "ready",
    createdAt: new Date(Date.now() - 25 * 60 * 1000),
  },
  {
    id: "TA-004",
    platform: "takeaway",
    customerName: "Valentina R.",
    items: [
      { name: "Hamburguesa Veggie", quantity: 2 },
    ],
    total: 4400,
    status: "completed",
    createdAt: new Date(Date.now() - 50 * 60 * 1000),
  },
]
