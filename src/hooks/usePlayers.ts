import { useEthers, useContractFunction, useContractCall, ContractCall, useContractCalls } from "@usedapp/core"
import { constants, utils, BigNumber } from "ethers"
import ArtemLottery from "../chain-info/contracts/ArtemLottery.json"
import networkMapping from "../chain-info/deployments/map.json"
import { formatUnits } from "@ethersproject/units"


export const usePlayers = (count: number): string | undefined => {
    const { chainId } = useEthers()
    const { abi } = ArtemLottery
    const artemLotteryAddress = chainId ? networkMapping[String(chainId)]["ArtemLottery"][0] : constants.AddressZero
    const artemLotteryInterface = new utils.Interface(abi)

    let callsArray = [] as ContractCall[];

    for (var i = 0; i < count; i++) {
        callsArray.push({
            abi: artemLotteryInterface,
            address: artemLotteryAddress,
            method: "players",
            args: [i],
        })
    }
    const results_array: any[] = useContractCalls(callsArray) ?? [];
    let result = "";
    for (var _i = 0; _i < count; _i++) {
        result = result + results_array[_i] + ",\n"
        //console.log("result " + _i + " = " + results_array[_i])
    }
    _i = 0
    results_array?.forEach(function (player) {
        console.log("result " + _i + " = " + player)
        _i++
    }
    )


    return result;
}