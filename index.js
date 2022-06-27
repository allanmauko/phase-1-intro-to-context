function createEmployeeRecord(arrRecords){
    const eRecord = {
        firstName: `${arrRecords[0]}`,
        familyName:`${arrRecords[1]}`,
        title: `${arrRecords[2]}`,
        payPerHour: arrRecords[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return eRecord
}

function createEmployeeRecords(arrRecord){
    const arrRecords = []
    arrRecord.map(halo => arrRecords.push(createEmployeeRecord(halo)))
    return arrRecords
}

function createTimeInEvent(objR, dateIn){
    const hammerDate = dateIn.split(" ")
    const date = hammerDate[0]
    const time = hammerDate[1]
    const newObj = {
        type: 'TimeIn',
        hour: parseInt(time),
        date: `${date}`
    }
    objR.timeInEvents.push(newObj)
    return objR
}

function createTimeOutEvent(objR, dateOut){
    const hammerDate = dateOut.split(" ")
    const date = hammerDate[0]
    const time = hammerDate[1]
    const newObj = {
        type: 'TimeOut',
        hour: parseInt(time),
        date: `${date}`
    }
    objR.timeOutEvents.push(newObj)
    return objR
}

function hoursWorkedOnDate(objR, date){
    const timeIn = objR.timeInEvents
    const hourIn = []
    timeIn.filter(function(miniObj) {
        if(miniObj.date === date){
            hourIn.push(miniObj.hour)
        }
    })

    const timeOut = objR.timeOutEvents
    const hourOut = []
    timeOut.filter(function(miniObj){
        if(miniObj.date === date){
            hourOut.push(miniObj.hour)
        }
    })

    const total = (oldV, newV) => oldV + newV

    const totalHoursIn = hourIn.reduce(total)
    const totalHoursOut = hourOut.reduce(total)
    const allTotals = Math.abs(totalHoursIn - totalHoursOut)

    if(allTotals < 1000){
        const stringified = allTotals.toString().split(0, 1)
        return parseInt(stringified)
    }else if(allTotals > 999){
        const stringified = allTotals.toString()
        const allHours = stringified.charAt(0) + stringified.charAt(1)
        return parseInt(allHours)
    }
}

function wagesEarnedOnDate(objR, date){
    const rate = objR.payPerHour
    const hoursD = hoursWorkedOnDate(objR, date)
    return rate * hoursD
}

function allWagesFor(objR){
    const miniArr = objR.timeInEvents
    const total = []
    miniArr.map(lavi => {
        const inDate = lavi.date
        total.push(wagesEarnedOnDate(objR, inDate))
    })

    const reduced = (oldV, newV) => oldV + newV
    const allWages = total.reduce(reduced)
    return allWages
}

function calculatePayroll(objR){
    const total = []
    objR.map(obj1 => {
        const rObj = obj1
        const allTimeIn = rObj.timeInEvents
        allTimeIn.map(timeIn => {
            const inDate = timeIn.date
            total.push(wagesEarnedOnDate(rObj, inDate))
        })
    })
    const reduced = (oldV, newV) => oldV + newV
    const allPay = total.reduce(reduced)
    return  allPay
} 