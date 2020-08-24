import { Locale } from '@/types/locale';
import { english } from '@/l10n/default';
// import { defaults, ParsedOptions } from '@/types/options';
import {
  tokenRegex,
  RevFormatFn,
  token,
  revFormat,
  formats,
} from './formatting';

export type DateValue = Date | string | number

export type DateCondition = string | Date | undefined | ((day: Date) => boolean);

export type DateConditions = DateCondition | DateCondition[]

export type DateFormatter = (
  dateObj: Date | null,
  format: string,
  overrideLocale?: Locale,
) => string

export type DateParser = (
  date: DateValue,
  givenFormat?: string,
  timeless?: boolean,
  customLocale?: Locale,
) => Date | undefined

export interface FormatterArgs {
  // config?: ParsedOptions;
  l10n?: Locale;
  // isMobile?: boolean;
}

export const createDateFormatter = ({
  // config = defaults,
  l10n = english,
  // isMobile = false,
}: FormatterArgs): DateFormatter => (
  dateObj: Date | null,
  format: string,
  overrideLocale?: Locale,
): string => {
  if (!dateObj) {
    return '';
  }
  const locale = overrideLocale || l10n;

  // if (config.formatDate !== undefined && !isMobile) {
  //   return config.formatDate(dateObj, format, locale);
  // }

  return format
    .split('')
    .map((char, i, arr) => {
      if (formats[char as token] && arr[i - 1] !== '\\') {
        return formats[char as token](dateObj, locale);
      } if (char !== '\\') {
        return char;
      }
      return '';
    })
    .join('');
};

export const createDateParser = ({
  // config = defaults
  l10n = english,
}): DateParser => (
  date: DateValue,
  givenFormat?: string,
  timeless?: boolean,
  customLocale?: Locale,
): Date | undefined => {
  if (date !== 0 && !date) return undefined;
  const localeTokenRegex = { ...tokenRegex };
  localeTokenRegex.K = `(${l10n.amPM[0]}|${
    l10n.amPM[1]
  }|${l10n.amPM[0].toLowerCase()}|${l10n.amPM[1].toLowerCase()})`;

  const locale = customLocale || l10n;

  let parsedDate: Date | undefined;
  const dateOrig = date;

  if (date instanceof Date) parsedDate = new Date(date.getTime());
  else if (
    typeof date !== 'string'
    && date.toFixed !== undefined // timestamp
  ) {
    // create a copy
    parsedDate = new Date(date);
  } else if (typeof date === 'string') {
    // date string
    // const format = givenFormat || (config || defaults).dateFormat;
    // @TODO: This come from config and doesnt contians time by default
    const format = givenFormat || 'Y-m-d H:i:S';

    // if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
    //   const defaultDateFormat =
    //     flatpickr.defaultConfig.dateFormat || defaultOptions.dateFormat;
    //   formats.dateFormat =
    //     userConfig.noCalendar || timeMode
    //       ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
    //       : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
    // }

    const datestr = String(date).trim();

    if (datestr === 'today') {
      parsedDate = new Date();
      // eslint-disable-next-line no-param-reassign
      timeless = true;
    } else if (
      /Z$/.test(datestr)
      || /GMT$/.test(datestr) // datestrings w/ timezone
    ) {
      parsedDate = new Date(date);

      // @TODO
    // } else if (config && config.parseDate) {
    //   parsedDate = config.parseDate(date, format);
    } else {
      parsedDate = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);
      // parsedDate = !config || !config.noCalendar
      //   ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
      //   : (new Date(new Date().setHours(0, 0, 0, 0)) as Date);

      let matched;
      const ops: { fn: RevFormatFn; val: string }[] = [];

      for (let i = 0, matchIndex = 0, regexStr = ''; i < format.length; i += 1) {
        const token2 = format[i] as token;
        const isBackSlash = (token2 as string) === '\\';
        const escaped = format[i - 1] === '\\' || isBackSlash;

        if (localeTokenRegex[token2] && !escaped) {
          regexStr += localeTokenRegex[token2];
          const match = new RegExp(regexStr).exec(date);
          if (match) {
            matched = true;
            ops[token2 !== 'Y' ? 'push' : 'unshift']({
              fn: revFormat[token2],
              val: match[matchIndex += 1],
            });
          }
        } else if (!isBackSlash) {
          regexStr += '.'; // don't really care
        }

        // eslint-disable-next-line no-loop-func
        ops.forEach((op) => {
          const { fn } = op;
          const { val } = op;
          parsedDate = fn(parsedDate as Date, String(val), locale) || parsedDate;
        });
      }

      parsedDate = matched ? parsedDate : undefined;
    }
  }

  /* istanbul ignore next */
  // eslint-disable-next-line no-restricted-globals
  if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
    throw new Error(`Invalid date provided: ${dateOrig}`);
    // @TODO
    // config.errorHandler(new Error(`Invalid date provided: ${dateOrig}`));
    return undefined;
  }

  if (timeless === true) {
    parsedDate.setHours(0, 0, 0, 0);
  }

  return parsedDate;
};

/**
 * Compute the difference in dates, measured in ms
 */
export function compareDates(date1: Date, date2: Date, timeless = true): number {
  if (timeless !== false) {
    return (
      new Date(date1.getTime()).setHours(0, 0, 0, 0)
      - new Date(date2.getTime()).setHours(0, 0, 0, 0)
    );
  }

  return date1.getTime() - date2.getTime();
}


/**
 * it two dates are in the same month
 */
export function isSameMonth(date1?: Date, date2?: Date): boolean {
  return (!!date1)
    && (!!date2)
      && date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth();
}

/**
 * it two dates are in the same day
 */
export function isSameDay(date1?: Date, date2?: Date): boolean {
  return isSameMonth(date1, date2) && date1?.getDate() === date2?.getDate();
}

export function dayIsPartOfTheConditions(day: Date, condition: DateConditions, dateParser: DateParser, dateFormat: string): boolean {
  if (!day) {
    return false;
  }

  if (typeof condition === 'function') {
    return condition(day);
  }

  if (typeof condition === 'string' || condition instanceof String) {
    const disabledDate = dateParser(condition as string, dateFormat);
    return isSameDay(disabledDate, day);
  }

  if (condition instanceof Date) {
    return isSameDay(condition, day);
  }

  if (Array.isArray(condition)) {
    return condition.some((c) => dayIsPartOfTheConditions(day, c, dateParser, dateFormat));
  }

  return false;
}

export function dateIsOutOfRange(date: Date, min: Date | string | undefined, max: Date | string | undefined, dateParser: DateParser, dateFormat: string): boolean {
  let minDate: Date | undefined;
  if (typeof min === 'string' || min instanceof String) {
    minDate = dateParser(min, dateFormat);
  } else {
    minDate = min;
  }

  let maxDate: Date | undefined;
  if (typeof max === 'string' || max instanceof String) {
    maxDate = dateParser(max, dateFormat);
  } else {
    maxDate = max;
  }

  const time = date.getTime();

  if (minDate && maxDate) {
    return time < minDate.getTime() || time > maxDate.getTime();
  }

  if (minDate) {
    return time < minDate.getTime();
  }

  if (maxDate) {
    return time > maxDate.getTime();
  }

  return false;
}

export function addDays(date: Date, amount = 1): Date {
  const newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + amount);
  return newDate;
}

export function addMonths(date: Date, amount = 1): Date {
  let newDate = new Date(date.valueOf());
  newDate.setMonth(date.getMonth() + amount);

  // Means the current day has less days so the extra month is
  // in the following month
  if (newDate.getDate() !== date.getDate()) {
    // Assign the last day of previous month
    newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
  }

  return newDate;
}

export function addYears(date: Date, amount = 1): Date {
  let newDate = new Date(date.valueOf());
  newDate.setFullYear(date.getFullYear() + amount);

  // Means the current day has less days so the extra month is
  // in the following month
  if (newDate.getDate() !== date.getDate()) {
    // Assign the last day of previous month
    newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
  }

  return newDate;
}

// /**
//  * Compute the difference in times, measured in ms
//  */
// export function compareTimes(date1: Date, date2: Date) {
//   return (
//     3600 * (date1.getHours() - date2.getHours())
//     + 60 * (date1.getMinutes() - date2.getMinutes())
//     + date1.getSeconds()
//     - date2.getSeconds()
//   );
// }

// export const isBetween = (ts: number, ts1: number, ts2: number): boolean => ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);

// export const duration = {
//   DAY: 86400000,
// };
