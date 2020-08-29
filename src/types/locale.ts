export type Locale = {
  weekdays: {
    shorthand: [string, string, string, string, string, string, string];
    longhand: [string, string, string, string, string, string, string];
  };
  months: {
    shorthand: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];
    longhand: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];
  };
  daysInMonth: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  firstDayOfWeek: number;
  ordinal: (nth: number) => string;
  rangeSeparator: string;
  weekAbbreviation: string;
  amPM: [string, string];
  yearAriaLabel: string;
  monthAriaLabel: string;
  hourAriaLabel: string;
  minuteAriaLabel: string;
  time24hr: boolean;
};

export type CustomLocale = {
  ordinal?: Locale['ordinal'];
  daysInMonth?: Locale['daysInMonth'];
  firstDayOfWeek?: Locale['firstDayOfWeek'];
  rangeSeparator?: Locale['rangeSeparator'];
  weekAbbreviation?: Locale['weekAbbreviation'];
  yearAriaLabel?: string;
  hourAriaLabel?: string;
  minuteAriaLabel?: string;
  amPM?: Locale['amPM'];
  time24hr?: Locale['time24hr'];
  weekdays: {
    shorthand: [string, string, string, string, string, string, string];
    longhand: [string, string, string, string, string, string, string];
  };
  months: {
    shorthand: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];
    longhand: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];
  };
};

export type LocaleName =
  | 'ar'
  | 'at'
  | 'az'
  | 'be'
  | 'bg'
  | 'bn'
  | 'bs'
  | 'ca'
  | 'cat'
  | 'cs'
  | 'cy'
  | 'da'
  | 'de'
  | 'default'
  | 'en'
  | 'eo'
  | 'es'
  | 'et'
  | 'fa'
  | 'fi'
  | 'fo'
  | 'fr'
  | 'gr'
  | 'he'
  | 'hi'
  | 'hr'
  | 'hu'
  | 'id'
  | 'is'
  | 'it'
  | 'ja'
  | 'ka'
  | 'ko'
  | 'km'
  | 'kz'
  | 'lt'
  | 'lv'
  | 'mk'
  | 'mn'
  | 'ms'
  | 'my'
  | 'nl'
  | 'no'
  | 'pa'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'ru'
  | 'si'
  | 'sk'
  | 'sl'
  | 'sq'
  | 'sr'
  | 'sv'
  | 'th'
  | 'tr'
  | 'uk'
  | 'vn'
  | 'zh'
  | 'uz'
  | 'uz_latn'
  | 'zh_tw';

export type Locales = {
  [key in LocaleName]: Locale
}
