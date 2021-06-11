// Your code here
const createEmployeeRecord = arr => {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = arrOfArr => {
    return arrOfArr.map(arr => createEmployeeRecord(arr));
}

const createTimeInEvent = (employee, dateStamp) => {
    const splitDateStamp = dateStamp.split(" ");
    const newEvent = {
        type: "TimeIn",
        hour: parseInt(splitDateStamp[1], 10),
        date: splitDateStamp[0]
    }
    employee.timeInEvents.push(newEvent);
    return employee;
}

const createTimeOutEvent = (employee, dateStamp) => {
    const splitDateStamp = dateStamp.split(" ");
    const newEvent = {
        type: "TimeOut",
        hour: parseInt(splitDateStamp[1], 10),
        date: splitDateStamp[0]
    }
    employee.timeOutEvents.push(newEvent);
    return employee;
}

const hoursWorkedOnDate = (employee, dateToCheck) => {
    const timeIn = employee.timeInEvents.find(event => event.date === dateToCheck);
    const timeOut = employee.timeOutEvents.find(event => event.date === dateToCheck);
    return (timeOut.hour - timeIn.hour) / 100;
}

const wagesEarnedOnDate = (employee, dateToCheck) => {
    return employee.payPerHour * hoursWorkedOnDate(employee, dateToCheck);
}

const allWagesFor = employee => {
    const dates = employee.timeInEvents.map(event => event.date);
    return dates.reduce((total, dateToCheck) => total + wagesEarnedOnDate(employee, dateToCheck), 0);
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(employee => employee.firstName === firstName);
}

const calculatePayroll = arr => {
    return arr.reduce((memo, employee) => {
        return memo + allWagesFor(employee)
    }, 0) 
}