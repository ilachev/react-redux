import moment from 'moment';

moment.updateLocale('ru', {
    relativeTime: {
        future: 'в %s',
        past: '%s назад',
        m: '1 минута',
        h: '1 час',
        d: '1 день',
        M: '1 месяц',
        y: '1 год'
    }
});