import { useEthers, useContractFunction, useContractCall } from "@usedapp/core"
import { constants, utils, BigNumber } from "ethers"
import { formatUnits } from "@ethersproject/units"
import ArtemLottery from "../chain-info/contracts/ArtemLottery.json"
import networkMapping from "../chain-info/deployments/map.json"

export const useLotteryBalance = (): number => {
    const { chainId } = useEthers()
    const { abi } = ArtemLottery
    const artemLotteryAddress = chainId ? networkMapping[String(chainId)]["ArtemLottery"][0] : constants.AddressZero;
    const artemLotteryInterface = new utils.Interface(abi)
    const [balance]: any = useContractCall({
        abi: artemLotteryInterface,
        address: artemLotteryAddress,
        method: "getBalance",
        args: [],
    }) ?? []


    const formattedBalance = balance
        ? parseFloat(formatUnits(balance._hex, 18))
        : -1

    return formattedBalance
}
