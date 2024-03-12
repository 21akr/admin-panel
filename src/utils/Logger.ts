import pino from 'pino';

const level = 'info';

export const log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `, ${new Date().toJSON()}`,
});