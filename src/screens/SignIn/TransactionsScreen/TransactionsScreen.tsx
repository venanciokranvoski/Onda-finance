    import React from "react";
    import {
    Box_Onda,
    Icon,
    PressableBox,
    ScreenOnda,
    Text,
    Text as TextOnda,
    } from "@components";
    import { FlatList } from "react-native";
    import { Transaction, useTransactionStore } from "@services";

    export const LabelsHistory = [
    { id: 1, name: "Todas" },
    { id: 2, name: "Enviadas" },
    { id: 3, name: "Recebidas" },
    ];

    interface TransactionItemProps {
    transaction: Transaction;
    }
    function TransactionItem({ transaction }: TransactionItemProps) {
    return (
            <Box_Onda
                    width={"100%"}
                    justifyContent="space-between"
                    borderWidth={1}
                    alignItems="center"
                    flexDirection="row"
                    borderRadius="s8"
                    padding="s16"
                    height={80}
                    borderColor="gray0"
                    marginBottom="s10"
                    >
                    <Icon
                        name="coins"
                        family={"FontAwesome6"}
                        color="primary"
                        size={30}
                    />
                    <Box_Onda borderWidth={1} flexDirection="column" width={180}>
                        <TextOnda preset="paragraphLarge" paddingLeft="s4" bold>
                        {transaction?.cryptocurrency || "-"}
                        </TextOnda>
                        <Box_Onda flex={0}>
                        <TextOnda
                            preset="paragraphCaptionSmall"
                            paddingLeft="s4"
                            color="primary"
                            semiBold
                        >
                            Criptomoeda : {transaction.quantity}
                        </TextOnda>
                        </Box_Onda>
                    </Box_Onda>
                    
                        <Icon name="arrow-up" family="FontAwesome6" color="primary" size={30} />

            
                    <Box_Onda borderWidth={1} flexDirection="column" width={180}>
                        <TextOnda preset="paragraphSmall" paddingLeft="s4" bold>
                        {transaction.destinationAddress.substring(0, 8)} ...
                        
                        </TextOnda>
                        <Box_Onda flex={0}>
                        <TextOnda
                            preset="paragraphCaptionSmall"
                            paddingLeft="s4"
                            color="primary"
                            semiBold>
                            {new Date(transaction.timestamp).toLocaleDateString('pt-BR')}
                        </TextOnda>
                        </Box_Onda>
                    </Box_Onda>
            
                    <Box_Onda alignItems="flex-end">
                        <TextOnda
                        preset="paragraphLarge"
                        bold>
                        vou ver
                        </TextOnda>
                        <TextOnda preset="paragraphSmall" semiBold color="primary">
                            {transaction.destinationAddress}
                        </TextOnda>
                        
                    </Box_Onda>
                    </Box_Onda>

    )
    }

    export function TransactionsScreen() {
    const [pressed, setPressed] = React.useState<number | null>(1);

    const transactions = useTransactionStore((state) =>
        state.getDecryptedTransactions()
    );

    const filteredTransactions = React.useMemo(() => {
        if (pressed === 1) return transactions;
        if (pressed === 2) return [];
        if (pressed === 3) return [];
    }, [transactions, pressed]);

    console.log(transactions)

    return (
        <ScreenOnda Scrollable backgroundColor="back">
        <Box_Onda marginBottom="s24">
            <TextOnda preset="headingLarge" semiBold>
            Transações
            </TextOnda>
            <TextOnda preset="paragraphSmall" semiBold color={"gray3"}>
            Historico completo {transactions.length}
            </TextOnda>
        </Box_Onda>

        <Box_Onda flexDirection="row" justifyContent="space-between">
            {LabelsHistory.map((item) => {
            const isSelected = pressed === item.id;
            return (
                <PressableBox
                onPress={() => {
                    setPressed(item.id);
                    console.log("id", item);
                }}
                justifyContent="center"
                alignItems="center"
                borderWidth={1}
                backgroundColor={isSelected ? "primary" : "gray01"}
                borderColor="gray1"
                borderRadius="s18"
                height={40}
                key={item.id}
                width={100}
                >
                <TextOnda
                    color={isSelected ? "back" : "text"}
                    preset="paragraphLarge"
                    bold
                >
                    {item.name}
                </TextOnda>
                </PressableBox>
            );
            })}
        </Box_Onda>

        <Box_Onda marginTop="s40">
            <FlatList
            data={filteredTransactions}
            renderItem={({ item }) => <TransactionItem transaction={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListEmptyComponent={()=> (
                <Box_Onda justifyContent="center" alignItems="center">
                    <TextOnda preset="headingMedium">Sem transações   :-(</TextOnda>
                </Box_Onda>
            )}
            />
        </Box_Onda>
        </ScreenOnda>
    );
    }
