import { create } from "zustand";

export interface Asset {
    id: string
    symbol: string
    name: string
    price: number
    quantity: number
    change24h: number
    color: string
}

interface DashboardStore {
    assets: Asset[]
    totalBalance: number
    isRefreshing: boolean
    lastUpdate: Date

    setAssets: (assets: Asset[]) => void
    updateAssetPrice: (id: string, price: number, change: number) => void
    setRefreshing: (refreshing: boolean) => void
    calculateTotalBalance: () => number
}

export const useDashboardStore = create<DashboardStore>((set, get)=> ({
    assets: [
    { id: 'btc', symbol: 'BTC', name: 'Bitcoin', price: 42356.80, quantity: 1.5, change24h: 3.2, color: '#FF9F00' },
    { id: 'eth', symbol: 'ETH', name: 'Ethereum', price: 8120.50, quantity: 1.5, change24h: -1.5, color: '#627EEA' },
    { id: 'usdt', symbol: 'USDT', name: 'Tether', price: 1016.50, quantity: 3.5, change24h: 0.1, color: '#26A17B' },
    { id: 'onda', symbol: 'ONDA', name: 'Onda', price: 338.80, quantity: 4.0, change24h: 5.8, color: '#00FFA3' },
    ],
    totalBalance: 0,
    isRefreshing: false,
    lastUpdate: new Date(),

    setAssets: (assets) => set({assets}),

    updateAssetPrice(id, price, change) {
    set((state)=> ({
        assets: state.assets.map(asset => asset.id === id ? {...asset, price, change24h: change} 
        : asset
        ),
    }))   
    
    },
    setRefreshing: (refreshing) => set({ isRefreshing: refreshing }),

    calculateTotalBalance: () => {
    const { assets } = get()
    return assets.reduce((sum, asset) => sum + (asset.price * asset.quantity), 0)
    },
    
}))