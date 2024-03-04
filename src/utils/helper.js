import moment from "moment";

export const getNext10Days = () => {
    console.log("======1")
    const today = moment();
    const next10Days = [];

    for (let i = 0; i < 10; i++) {
        const nextDate = today.clone().add(i, 'days');
        next10Days.push({ key: nextDate.format('DD MMM YY'), value: nextDate.format('YYYYMMDD') });
    }
    return next10Days;
}

export const getTimeIntervals = () => {
    console.log("======2")
    const currentTime = moment();
    const interval = 15; // 15 minutes

    const timeStops = [];
    let startTime = moment(currentTime).startOf('hour').add(interval - (currentTime.minute() % interval), 'minutes');

    while (startTime.isBefore(moment().endOf('day'))) {
        timeStops.push(startTime.format('h:mm a'));
        startTime.add(interval, 'minutes');
    }

    return timeStops;
}

export const getOrderTimeIntervals = () => {
    console.log("======3")
    const currentTime = moment();
    const nearestMultipleOf5 = Math.floor(currentTime.minutes() / 5 + 1) * 5;

    // const startTime = moment(currentTime);
    const startTime = moment(currentTime).startOf('hour').add(nearestMultipleOf5, 'minutes');
    const endTime = moment(startTime).add(15, 'minutes');

    // Generate the time range for the current date
    const currentIntervals = [];
    while (endTime.isBefore(moment().endOf('day'))) {
        const nextTime = endTime.clone().add(15, 'minutes');
        currentIntervals.push(`${endTime.format('HH:mm')}-${nextTime.format('HH:mm')}`);
        endTime.add(15, 'minutes');
    }

    // Generate the time range for the future date (starting from 12:00 AM)
    const futureIntervals = [];
    const futureStartTime = moment().startOf('day');
    while (futureStartTime.isBefore(moment().endOf('day'))) {
        const nextTime = futureStartTime.clone().add(15, 'minutes');
        futureIntervals.push(`${futureStartTime.format('HH:mm')}-${nextTime.format('HH:mm')}`);
        futureStartTime.add(15, 'minutes');
    }

    return { currentIntervals, futureIntervals }
}

export const getCurrentTimestamp = () => {

}

export const getCurrentDate = () => moment().format('YYYYMMDD');
export const getCurrentTime = () => moment().format('HH:mm');
export const formatDateTime = (current, format, to) => moment(current, format).format(to);

export const getLatestInterval = () => {
    // const currentTime = moment();
    // const startTime = moment(currentTime);
    // const endTime = moment(startTime).add(15, 'minutes');

    // if (endTime.isBefore(moment().endOf('day'))) {
    //     const nextTime = endTime.clone().add(15, 'minutes');
    //     return `${endTime.format('HH:mm')}-${nextTime.format('HH:mm')}`;
    // }

    // return `${currentTime.format('HH:mm')}-${endTime.format('HH:mm')}`;

    // Get the current time
    const currentTime = moment();

    // Calculate the nearest multiple of 5 minutes
    const nearestMultipleOf5 = Math.floor(currentTime.minutes() / 5 + 1) * 5;

    // Create the start time (rounded down to the nearest multiple of 5)
    const startTime = moment(currentTime).startOf('hour').add(nearestMultipleOf5, 'minutes');

    // Create the end time (15 minutes after the start time)
    const endTime = moment(startTime).add(15, 'minutes');

    // Format the interval as "hh:mm - hh:mm"
    const formattedInterval = `${startTime.format('HH:mm')}-${endTime.format('HH:mm')}`;

    // Print the result
    console.log('Latest 15-minute interval (rounded to multiple of 5):', formattedInterval);
    return formattedInterval;

}



// const currentTime = moment();


// const startTime = moment(currentTime);
// const endTime = moment(startTime).add(15, 'minutes');

// // Generate the time range for the current date
// const currentIntervals = [];
// while (endTime.isBefore(moment().endOf('day'))) {
//     const nextTime = endTime.clone().add(15, 'minutes');
//     currentIntervals.push(`${endTime.format('HH:mm')}-${nextTime.format('HH:mm')}`);
//     endTime.add(15, 'minutes');
// }

// // Generate the time range for the future date (starting from 12:00 AM)
// const futureIntervals = [];
// const futureStartTime = moment().startOf('day');
// while (futureStartTime.isBefore(moment().endOf('day'))) {
//     const nextTime = futureStartTime.clone().add(15, 'minutes');
//     futureIntervals.push(`${futureStartTime.format('HH:mm')}-${nextTime.format('HH:mm')}`);
//     futureStartTime.add(15, 'minutes');
// }

// // Print the results
// console.log('Current Date Intervals :', currentIntervals);
// console.log('Future Date Intervals (12:00 AM onwards):', futureIntervals);
