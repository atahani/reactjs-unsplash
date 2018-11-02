//@flow

import type { Action } from './action';
import reducers from '../reducers';

type Reducers = typeof reducers;

export type { Action, Reducers };
