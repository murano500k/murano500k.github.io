import { useEthers, useContractFunction, useContractCall } from "@usedapp/core"
import { constants, utils, BigNumber } from "ethers"
import { formatUnits } from "@ethersproject/units"
import { Contract } from "@ethersproject/contracts"
import ArtemLottery from "../chain-info/contracts/ArtemLottery.json"
import networkMapping from "../chain-info/deployments/map.json"

export const useEnterLottery = () => {
    const { chainId } = useEthers()
    const { abi } = ArtemLottery
    const artemLotteryAddress = chainId ? networkMapping[String(chainId)]["ArtemLottery"][0] : constants.AddressZero;
    const artemLotteryInterface = new utils.Interface(abi)
    const artemLotteryContract = new Contract(
        artemLotteryAddress,
        artemLotteryInterface
    )
    const { send: enterLotterySend, state: enterLotteryState } =
        useContractFunction(artemLotteryContract, "enter", {
            transactionName: "Enter lottery",
        })

    return { enterLotterySend, enterLotteryState }


}