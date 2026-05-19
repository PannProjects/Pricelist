// ============================================================
// Hardware Store — Tab Ongkir state + reactive prices
// ============================================================
import { writable, derived } from 'svelte/store';

// Base prices (tanpa ongkir)
export const HARDWARE_BASE = {
  lcd:   35,
  bat:   25,
  glue:  25,
  btn:   15,
};

// Reactive shipping toggle
export const withShipping = writable(false);

// Derived prices — auto-update when withShipping changes
export const hardwarePrices = derived(withShipping, ($withShipping) => {
  const add = $withShipping ? 12 : 0;
  return {
    lcd:  (HARDWARE_BASE.lcd  + add) + 'K',
    bat:  (HARDWARE_BASE.bat  + add) + 'K',
    glue: (HARDWARE_BASE.glue + add) + 'K',
    btn:  (HARDWARE_BASE.btn  + add) + 'K',
  };
});
