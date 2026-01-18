/**
 * Shared AudioGuide Model - Compatible with Spring Boot Backend
 */

export interface AudioGuide {
  audioId: number;
  audioUrl: string;
  language: string;
  locationId: number;
}

export interface AudioGuideRequest {
  audioUrl: string;
  language: string;
  locationId: number;
}

export type SupportedLanguage = 'vi' | 'en' | 'zh' | 'ja' | 'ko';

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
};
