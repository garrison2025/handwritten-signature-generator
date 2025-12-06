
import { TranslationKey } from '../types';
import { TRANSLATIONS } from '../constants';

export function useTranslation() {
  const t = (key: TranslationKey): string => {
    return TRANSLATIONS[key] || key;
  };

  return { t };
}
