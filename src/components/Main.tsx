/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import brownieConfig from "../brownie-config.json"
import dapp from "../dapp.png"
import eth from "../eth.png"
import dai from "../dai.png"
import { makeStyles } from "@material-ui/core"
import { LotteryState } from "./LotteryState"
import { EnterLottery } from "./EnterLottery"

export type Token = {
    image: string
    address: string
    name: string
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4)
    },
    subtitle: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(1)
    },
    text: {
        color: theme.palette.common.white,
        textAlign: "center",
    }
}))

export const Main = () => {
    const classes = useStyles()
    const { chainId, error } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    const artemLotteryAddress = chainId ? networkMapping[String(chainId)]["ArtemLottery"][0] : constants.AddressZero

    return (<>
        <h2 className={classes.title}>Artem SmartContract Lottery {networkName}</h2>
        <div className={classes.text}>Lottery contract address: {artemLotteryAddress}</div>
        <LotteryState />
        <EnterLottery />
    </>)
}
