const full_date = new Date(Date());
const month = full_date.getMonth();
const day = full_date.getDay();
let date = full_date.getDate();

export const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

export const months = [
    'января', 
    'февраля',
    'марта', 
    'апреля', 
    'мая', 
    'июня', 
    'июля', 
    'августа', 
    'сентября', 
    'октября', 
    'ноября', 
    'декабря'
];

export const days = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
];

let d;


export const get_month = (month) => {
    let m;
    for (let i=0; i<12; i++) {
        if (month === i) {
            m = monthNames[i];
        }
    }

    return m;
}

export const getMonthDeclination = (month) => {
    let m;
    for (let i=0; i<12; i++) {
        if (month === i) {
            m = months[i];
        }
    }

    return m;
};

const get_day = () => {
    for (let i=0; i<7; i++) {
        if (day === i) {
           d = days[i];
        }
    }

    return d;
};

export const getNextMonth = () => {
    let i = monthNames.indexOf(m);
    date = 1;
    m === monthNames[11] ? m = monthNames[0] : m = monthNames[i + 1];
}

const getNextDate = () => {
    if (m === months[0]
        || m === months[2]
        || m === months[4]
        || m === months[6]
        || m === months[7]
        || m === months[9]
        || m === months[11])
    {
        date === 31 ? getNextMonth() : date += 1
    } else if (m === months[1]) {
        date >= 28 ? getNextMonth() : date += 1
    } else {
        date === 30 ? getNextMonth() : date += 1
    }

    d === days[6] ? d = days[0] : d = days[days.indexOf(d) + 1];
};
