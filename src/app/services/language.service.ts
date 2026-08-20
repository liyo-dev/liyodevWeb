import { Injectable, signal } from '@angular/core';
import { Lang, TRANSLATIONS } from '../i18n/translations';

const STORAGE_KEY = 'liyodev-lang';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly _lang = signal<Lang>(this.detectInitialLang());

  /** Idioma actual (signal de solo lectura). */
  readonly lang = this._lang.asReadonly();

  constructor() {
    this.applyDocumentLang(this._lang());
  }

  private detectInitialLang(): Lang {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'es' || saved === 'en') {
        return saved;
      }
    }
    if (typeof navigator !== 'undefined' && navigator.language) {
      if (navigator.language.toLowerCase().startsWith('en')) {
        return 'en';
      }
    }
    return 'es';
  }

  setLang(lang: Lang): void {
    if (this._lang() === lang) return;
    this._lang.set(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
    this.applyDocumentLang(lang);
  }

  toggle(): void {
    this.setLang(this._lang() === 'es' ? 'en' : 'es');
  }

  private applyDocumentLang(lang: Lang): void {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  /**
   * Traduce una clave con notación de puntos, p.ej. "home.tagline".
   * Si no existe en el idioma actual, cae al español; si tampoco existe, devuelve la clave.
   */
  t(key: string): string {
    const current = this.resolve(TRANSLATIONS[this._lang()], key);
    if (current !== undefined) return current;
    const fallback = this.resolve(TRANSLATIONS['es'], key);
    return fallback !== undefined ? fallback : key;
  }

  private resolve(dict: any, path: string): string | undefined {
    return path.split('.').reduce((acc: any, part: string) => {
      return acc && acc[part] !== undefined ? acc[part] : undefined;
    }, dict);
  }
}
