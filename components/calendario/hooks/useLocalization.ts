import { useMemo } from 'react';
import { dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';
import 'dayjs/locale/pt';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { messagesByLang } from '../constants/messagesByLang';
import type { Language } from '../types';

dayjs.extend(localizedFormat);

export function useLocalization(lang: Language) {
  const localizer = useMemo(() => {
    dayjs.locale(lang);
    return dayjsLocalizer(dayjs);
  }, [lang]);

  const messages = useMemo(() => messagesByLang[lang], [lang]);

  return { localizer, messages };
}