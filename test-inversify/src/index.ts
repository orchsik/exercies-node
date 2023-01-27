import 'reflect-metadata';

import { TYPES } from './types';
import { Warrior } from './interfaces';
import { container } from './inversify.config';

const ninja = container.get<Warrior>(TYPES.Warrior);

console.log(ninja.fight());
console.log(ninja.sneak());
