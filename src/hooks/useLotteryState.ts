import { useEthers, useContractFunction, useContractCall } from "@usedapp/core"
import { constants, utils, BigNumber } from "ethers"
import ArtemLottery from "../chain-info/contracts/ArtemLottery.json"
import networkMapping from "../chain-info/deployments/map.json"

enum LOTTERY_STATE {
    OPEN,
    CLOSED,
    CALCULATING_WINNER
}

export const useLotteryState = (): string => {
    const { chainId } = useEthers()
    const { abi } = ArtemLottery
    const artemLotteryAddress = chainId ? networkMapping[String(chainId)]["ArtemLottery"][0] : constants.AddressZero
    const artemLotteryInterface = new utils.Interface(abi)

    const [lottery_state]: any = useContractCall({
        abi: artemLotteryInterface,
        address: artemLotteryAddress,
        method: "lottery_state",
        args: [],
    }) ?? [];


    switch (lottery_state) {
        case LOTTERY_STATE.OPEN:
            return "open";
        case LOTTERY_STATE.CLOSED:
            return "closed";
        case LOTTERY_STATE.CALCULATING_WINNER:
            return "calculating winner"
        default:
            return "not working!"
    }



    return lottery_state;
}