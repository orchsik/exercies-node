import { injectable } from 'inversify';
import { inject } from 'inversify/lib/annotation/inject';

import { TYPES } from './types';
import { ThrowableWeapon, Warrior, Weapon } from './interfaces';

@injectable()
class Katana implements Weapon {
  public hit() {
    return 'cut!';
  }
}

@injectable()
class ShuriKen implements ThrowableWeapon {
  throw(): string {
    return 'phewing ~';
  }
}

@injectable()
class Ninja implements Warrior {
  private _katana: Weapon;
  private _shuriken: ThrowableWeapon;

  public constructor(
    @inject(TYPES.Weapon) katana: Weapon,
    @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
  ) {
    this._katana = katana;
    this._shuriken = shuriken;
  }

  public fight() {
    return this._katana.hit();
  }
  public sneak() {
    return this._shuriken.throw();
  }
}

export { Ninja, Katana, ShuriKen };
