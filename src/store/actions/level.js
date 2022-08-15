import { SAVE_LEVEL } from '../types';

export const saveLevel = (level) => ({
    type: SAVE_LEVEL,
    level: level,
})
