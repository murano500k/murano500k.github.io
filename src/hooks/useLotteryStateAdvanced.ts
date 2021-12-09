import { useEthers, useContractFunction, useContractCalls, ContractCall } from "@usedapp/core"
import { constants, utils, BigNumber } from "ethers"
import ArtemLottery from "../chain-info/contracts/ArtemLottery.json"
import networkMapping from "../chain-info/deployments/map.json"
import { LotteryState } from "../components/LotteryState"

enum LOTTERY_STATE {
    OPEN,
    CLOSED,
    CALCULATING_WINNER
}

const LotteryContractCallNames: string[] = [
    'lottery_state',
    'getBalance',
    'lotteryCounter',
    'lastTimeStamp',
    'recentWinner',
    'lotteryDurationInSeconds',
    'getEntranceFee',
    'usdEntryFee'
]


export const useLotteryStateAdvanced = (): any[] => {
    const { chainId } = useEthers()
    const { abi } = ArtemLottery
    const artemLotteryAddress = chainId ? networkMapping[String(chainId)]["ArtemLottery"][0] : constants.AddressZero
    const artemLotteryInterface = new utils.Interface(abi)


    let callsArray = [] as ContractCall[];
    LotteryContractCallNames.forEach(function (contractCallName) {
        callsArray.push({
            abi: artemLotteryInterface,
            address: artemLotteryAddress,
            method: contractCallName,
            args: [],
        })
        console.log("adding " + contractCallName);
    })
    const results_array: any[] = useContractCalls(callsArray) ?? [];

    for (var _i = 0; _i < LotteryContractCallNames.length; _i++) {
        console.log("result " + _i + " = " + results_array[_i])
    }
    var lottery_state;
    var test: LOTTERY_STATE = results_array[0] as LOTTERY_STATE;
    switch (test as LOTTERY_STATE) {
        case LOTTERY_STATE.OPEN:
            lottery_state = "open";
            break
        case LOTTERY_STATE.CLOSED:
            lottery_state = "closed";
            break
        case LOTTERY_STATE.CALCULATING_WINNER:
            lottery_state = "calculating winner"
            break
        default:
            lottery_state = "not working!"
    }
    console.log("advanced: " + test + " " + " state=" + lottery_state);


    return results_array;
}