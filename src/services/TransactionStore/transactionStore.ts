
        import { create } from 'zustand';
        import { persist, createJSONStorage } from 'zustand/middleware';
        import AsyncStorage from '@react-native-async-storage/async-storage';
import { decryptText, encryptText } from '@utils';

        export interface Transaction {
            id: string;
            cryptocurrency: string;
            destinationAddress: string;
            quantity: number;
            timestamp: string;
        }

        interface EncryptedTransaction {
            id: string;
            cryptocurrency: string;
            destinationAddress: string; 
            quantity: string;           
            timestamp: string;
        }

    interface TransactionStore {
    transactions: EncryptedTransaction[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
    getDecryptedTransactions: () => Transaction[];
    }

    export const useTransactionStore = create<TransactionStore>()(
    persist(
        (set, get) => ({
        transactions: [],
        
        addTransaction: async (transaction) => {
            const encrypted = {
            id: Date.now().toString(),
            cryptocurrency: transaction.cryptocurrency,
            destinationAddress: await encryptText(transaction.destinationAddress), 
            quantity: await encryptText(transaction.quantity.toString()), 
            timestamp: transaction.timestamp,
            };
            set((state)=> ({
                transactions: [encrypted, ...state.transactions],
            }));
            
        },
        getDecryptedTransactions: () => {
            return get().transactions.map(tx => ({
            id: tx.id,
            cryptocurrency: tx.cryptocurrency,
            destinationAddress: decryptText(tx.destinationAddress),
            quantity: parseFloat(decryptText(tx.quantity)),
            timestamp: tx.timestamp,
            }));
        },
        
        }),
        {
        name: 'transactions',
        storage: createJSONStorage(() => AsyncStorage),
        }
    )
    );
