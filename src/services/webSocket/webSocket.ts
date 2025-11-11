    import { useDashboardStore } from "@store";
    import { useTransactionStore } from "../TransactionStore/transactionStore";

    export class WebSocketMock {
    private interval: NodeJS.Timeout | null = null;

    connect() {
        if (this.interval) return;

        console.log("✓ WebSocket Mock: Conectado");

        this.interval = setInterval(() => {
        this.updatePrices();
        }, 5000);
    }

    disconnect() {
        if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
        }
        console.log("✗ WebSocket Mock: Desconectado");
    }

    async send(message: any) {
        if (message.type === "SEND_CRYPTO") {
        await useTransactionStore.getState().addTransaction({
            cryptocurrency: message.data.cryptocurrency,
            destinationAddress: message.data.destinationAddress,
            quantity: message.data.quantity,
            timestamp: message.data.timestamp,
        });
        }
    }

    private updatePrices() {
        const store = useDashboardStore.getState();

        store.assets.forEach((asset) => {
        const variacao = (Math.random() - 0.5) * 4;
        const novoPreco = asset.price * (1 + variacao / 100);

        store.updateAssetPrice(asset.id, novoPreco, variacao);
        });
    }
    }

    export const websocketMock = new WebSocketMock();
