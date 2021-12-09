import { useLotteryState, useLotteryBalance, useLotteryTimeStamp, useLotteryCounter, useRecentWinner, usePlayers } from "../hooks"
import { makeStyles } from "@material-ui/core"
import { useLotteryDuration } from "../hooks/useLotteryDuration"
import { BigNumber } from "@ethersproject/bignumber"
import { usePlayersCount } from "../hooks/usePlayersCount"



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
}))

export const LotteryState = () => {
    const classes = useStyles()
    const lotteryState = useLotteryState()
    const balance = useLotteryBalance()
    const counter = useLotteryCounter()
    const lastTimeStamp = useLotteryTimeStamp()
    const timstampForHumans = lastTimeStamp ? time_ago(new Date(lastTimeStamp * 1000).toString()) : "No data"
    const recentWinner = useRecentWinner()
    const lotteryDuration = useLotteryDuration()
    const playersCount = usePlayersCount()
    const players = usePlayers(playersCount)

    console.log("lastTimestamp=" + lastTimeStamp);

    var nextTimestampForHumans = ""
    if (lotteryState == "open") {
        const nextTimestamp = lastTimeStamp + lotteryDuration
        if (new Date().getTime() <= nextTimestamp * 1000) {
            nextTimestampForHumans = lastTimeStamp ? "Lottery ends in " + time_ago(new Date(nextTimestamp * 1000).toString()) : "No data"
        }
    }



    return (
        <>
            <h2 className={classes.subtitle}> Lottery is {lotteryState} now. {nextTimestampForHumans} </h2>
            <h2 className={classes.subtitle}> Lottery balance is {balance} ethers</h2>
            <h2 className={classes.subtitle}> Recent winner is {recentWinner}</h2>
            <h2 className={classes.subtitle}> Lottery counter is {counter ? counter.toNumber() : -10}</h2>
            <h2 className={classes.subtitle}> last updated {timstampForHumans}</h2>
            <h2 className={classes.subtitle}> Lottery duration is {lotteryDuration} seconds</h2>
            <h2 className={classes.subtitle}> Lottery players ({playersCount}): {players} </h2>

        </>)
}


function time_ago(time: any) {

    switch (typeof time) {
        case 'number':
            break;
        case 'string':
            time = +new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
    }
    var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute ago', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago', '1 hour from now'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
        [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
        token = 'ago',
        list_choice = 1;

    if (seconds == 0) {
        return 'Just now'
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
    }
    var i = 0,
        format;
    while (format = time_formats[i++])
        if (seconds < format[0]) {
            if (typeof format[2] == 'string')
                return format[list_choice];
            else
                return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
    return time;
}