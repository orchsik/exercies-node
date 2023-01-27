import { Container } from 'inversify';

import { TYPES } from './types';
import { ThrowableWeapon, Warrior, Weapon } from './interfaces';
import { Katana, Ninja, ShuriKen } from './entities';

const container = new Container();
container.bind<Warrior>(TYPES.Warrior).to(Ninja);
container.bind<Weapon>(TYPES.Weapon).to(Katana);
container.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(ShuriKen);

export { container };
