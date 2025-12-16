import classNames from 'classnames';

type Mods = Record<string, string | boolean | undefined>;

interface BemOptions {
  e?: string; // element delimiter
  m?: string; // modifier delimiter
  v?: string; // value delimiter
}

const defaultOptions: BemOptions = {
  e: '-',
  m: '_',
  v: '_',
};

/**
 * Creates a BEM class name generator bound to a block name and optional CSS module
 *
 * @example
 * const cn = withNaming({ e: '-', m: '_' });
 * const cnButton = cn('Button', styles);
 *
 * cnButton()                          // "Button"
 * cnButton('Icon')                    // "Button-Icon"
 * cnButton('Icon', { size: 'lg' })    // "Button-Icon Button-Icon_size_lg"
 * cnButton({ active: true })          // "Button Button_active"
 */
export function withNaming(options: BemOptions = defaultOptions) {
  const { e = '-', m = '_', v = '_' } = options;

  return function cn(
    block: string,
    styles?: Record<string, string>
  ): (elementOrMods?: string | Mods, mods?: Mods) => string {
    const getClass = (className: string): string => {
      return styles ? styles[className] || className : className;
    };

    return function (elementOrMods?: string | Mods, mods?: Mods): string {
      // Called with no arguments: just the block
      if (elementOrMods === undefined) {
        return getClass(block);
      }

      // Called with mods object directly: block with modifiers
      if (typeof elementOrMods === 'object') {
        const classes = [getClass(block)];
        Object.entries(elementOrMods).forEach(([key, val]) => {
          if (val === true) {
            classes.push(getClass(`${block}${m}${key}`));
          } else if (val && typeof val === 'string') {
            classes.push(getClass(`${block}${m}${key}${v}${val}`));
          }
        });
        return classNames(classes);
      }

      // Called with element string
      const element = `${block}${e}${elementOrMods}`;
      const classes = [getClass(element)];

      if (mods) {
        Object.entries(mods).forEach(([key, val]) => {
          if (val === true) {
            classes.push(getClass(`${element}${m}${key}`));
          } else if (val && typeof val === 'string') {
            classes.push(getClass(`${element}${m}${key}${v}${val}`));
          }
        });
      }

      return classNames(classes);
    };
  };
}

// Default export with standard delimiters
export const cn = withNaming(defaultOptions);
