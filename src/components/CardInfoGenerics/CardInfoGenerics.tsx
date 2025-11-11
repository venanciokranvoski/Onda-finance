    import React from "react";
    import { Box_Onda } from "../Box";
    import { Icon } from "../Icon";
    import { Text as TextOnda } from "../Text";
    import { Asset, useDashboardStore } from "@store";

    interface PropsGenericsInformations {
    ScreenForComponent?: "dashboard" | "transactions" | "Portfolio";
    asset: Asset;
    }

    export function CardInfoGenerics({
    ScreenForComponent,
    asset,
    }: PropsGenericsInformations) {
    const assetValue = asset ? asset.price * asset.quantity : 0;

    const { assets } = useDashboardStore();

    const TotalBalanceCriptForPercentual = assets.reduce((sum, asset) => {
    return sum + (asset.price * asset.quantity);
  }, 0);

  function getAssetPercentual(asset: Asset, total: number): string {
  const assetValue = asset.price * asset.quantity
  const percentual = (assetValue / total) * 100
  return percentual.toFixed(2) + '%'
}



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
            name={ScreenForComponent === "transactions" ? "arrow-down" : "coins"}
            family={
            ScreenForComponent === "transactions" ? "FontAwesome" : "FontAwesome6"
            }
            color="primary"
            size={30}
        />
        <Box_Onda borderWidth={1} flexDirection="column" width={180}>
            <TextOnda justifyContent={ScreenForComponent === 'transactions' ? 'center' : undefined} alignItems={ScreenForComponent === 'transactions' ? 'center' : undefined} preset="paragraphLarge" paddingLeft="s4" bold>
            {asset?.name || "-"}
            </TextOnda>
            <Box_Onda flex={0}>
            <TextOnda
                preset="paragraphCaptionSmall"
                paddingLeft="s4"
                color="primary"
                semiBold
            >
                {ScreenForComponent !== "transactions" &&
                asset.quantity + " " + asset.symbol}
            </TextOnda>
            </Box_Onda>
        </Box_Onda>
        {(ScreenForComponent !== "dashboard" && ScreenForComponent !== "Portfolio" && ScreenForComponent !== "transactions") && (
            <Icon name="coins" family="FontAwesome6" color="primary" size={30} />
        )}

        <Box_Onda borderWidth={1} flexDirection="column" width={180}>
            <TextOnda preset="paragraphSmall" paddingLeft="s4" bold>
            {ScreenForComponent === 'Portfolio' ?  getAssetPercentual(asset, TotalBalanceCriptForPercentual) :  ScreenForComponent === "transactions" ? asset.quantity : asset.price.toFixed(2) }
            
            </TextOnda>
            <Box_Onda flex={0}>
            <TextOnda
                preset="paragraphCaptionSmall"
                paddingLeft="s4"
                color="primary"
                semiBold
            >
                {asset.symbol}
            </TextOnda>
            </Box_Onda>
        </Box_Onda>

        <Box_Onda alignItems="flex-end">
            <TextOnda
            preset="paragraphLarge"
            bold
            justifyContent={
                ScreenForComponent === "transactions" ? "center" : undefined
            }
            alignItems={
                ScreenForComponent === "transactions" ? "center" : undefined
            }
            >
            {ScreenForComponent === "Portfolio"
                ? asset.quantity
                : ScreenForComponent === "dashboard"
                ? assetValue
                : asset.symbol}
            </TextOnda>
            {ScreenForComponent !== "transactions" && (
            <TextOnda preset="paragraphSmall" semiBold color="primary">
                {asset.symbol}
            </TextOnda>
            )}
        </Box_Onda>
        </Box_Onda>
    );
    }
