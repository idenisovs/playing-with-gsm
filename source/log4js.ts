import log4js, { Configuration } from 'log4js';

const config: Configuration = {
    appenders: {
        console: { type: 'console' }
    },
    categories: {
        default: {
            appenders: ['console'], level: 'trace'
        }
    }
}

export default log4js.configure(config);