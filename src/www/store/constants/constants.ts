import { ISubLogo } from '@/types/subscription';

export enum ProductTypes {
  FULL_GAME_UPGRADE = 'Full Game Upgrade',
  DEMO = 'Demo',
  SOUNDTRACK = 'Soundtrack',
  APPLICATION = 'Application',
  STOREFRONT_PS2_CLASSIC = 'STOREFRONT_CLASS.PS2_CLASSIC',
  FULL_GAME = 'Full Game',
  BETA = 'Beta',
  AVATAR = 'Avatar',
  BUNDLE = 'Bundle',
  STOREFRONT_PS1_CLASSIC = 'STOREFRONT_CLASS.PS1_CLASSIC',
  SUBSCRIPTION = 'Subscription',
  GAME_PACK = 'Game Pack',
  VIRTUAL_CURRENCY = 'Virtual Currency',
  TRIAL = 'Trial',
  PS2_HD_PLUS = 'PS2 HD+',
  GAME = 'Game',
  THEME = 'Theme',
  FULL_GAME_TRIAL = 'Full Game Trial',
  PLAYABLE = 'Playable',
  ADD_ON = 'Add-On',
};

export enum SubscriptionTypes {
  PS_PLUS = 'ps-plus',
  UBISOFT_PLUS = 'ubisoft-plus',
  GTA_PLUS = 'gta-plus',
  EA_PLAY = 'ea-play',
};

export enum Currency {
  RUB = '₽',
  USD = '$',
  EUR = '€',
  TRY = 'TL',
};

export enum DeviceWidth {
  MOBILE = 320,
  MOBILE_LARGE = 360,
  TABLET = 768,
  TABLET_LARGE = 1024,
  DESKTOP = 1280,
  DESKTOP_LARGE = 1440,
  FULLSCREEN = 1920,
  WIDESCREEN = 2560,
};

export enum DeviceCodes {
  MOBILE = 'mobile',
  MOBILE_LARGE = 'mobile_large',
  TABLET = 'tablet',
  TABLET_LARGE = 'tablet_large',
  DESKTOP = 'desktop',
  DESKTOP_LARGE = 'desktop_large',
  FULLSCREEN = 'fullscreen',
  WIDESCREEN = 'widescreen',
};

export const LogoSizes: Record<SubscriptionTypes, ISubLogo> = {
  [SubscriptionTypes.PS_PLUS]: {
    width: 180,
    height: 40
  },
  [SubscriptionTypes.UBISOFT_PLUS]: {
    width: 132,
    height: 32
  },
  [SubscriptionTypes.GTA_PLUS]: {
    width: 79,
    height: 56
  },
  [SubscriptionTypes.EA_PLAY]: {
    width: 117,
    height: 40
  },
};
