import { Button, makeStyles } from "@material-ui/core"
import { useEthers, useEtherBalance } from "@usedapp/core"
import { formatEther } from '@ethersproject/units'

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4),
        display: "flex",
        justifyContent: "flex-end",
        gap: theme.spacing(1)
    },
}))


export const Header = () => {
    const classes = useStyles()

    const { account, activateBrowserWallet, deactivate } = useEthers()
    const etherBalance = useEtherBalance(account)


    const isConnected = account !== undefined

    return (
        <div className={classes.container}>
            {account && <p>Account: {account}</p>}
            {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
            {isConnected ? (
                <Button variant="contained" onClick={deactivate}>
                    Disconnect
                </Button>
            ) : (
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => activateBrowserWallet()}
                >
                    Connect
                </Button>
            )}

        </div>
    )
}

