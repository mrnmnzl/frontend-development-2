import moment from 'moment';

export function dateFormat(input, args) {
    const date = moment(input);
    const {
        hash: {format}
    } = args;
    return date.format(format)
}

export function yearsSince(input) {
    const date = moment(input);
    const now = moment();
    const difference = now.diff(date, 'years');
    return difference;
}