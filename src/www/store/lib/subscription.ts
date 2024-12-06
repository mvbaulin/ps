import { prisma } from '@/lib/prisma';
import { mappingSubscription } from '@/lib/mapping';
import { ISubscriptions } from '@/types/subscription';
import { SubscriptionNames, SubscriptionTypes } from '@/constants/constants';

export async function getSubscriptions(): Promise<ISubscriptions> {
  const data = await prisma.subscriptions.findMany({})
    .then((data) => data.map((item) => mappingSubscription(item)));

  const result: ISubscriptions = {
    psPlus: data.filter((item) => item.category === SubscriptionTypes.PS_PLUS),
    ubisoftPlus: data.filter((item) => item.category === SubscriptionTypes.UBISOFT_PLUS),
    gtaPlus: data.filter((item) => item.category === SubscriptionTypes.GTA_PLUS),
    eaPlay: data.filter((item) => item.category === SubscriptionTypes.EA_PLAY),
  };

  return result;
}

export async function getSubscriptionByCategory(category: string) {
  try {
    if (!category) {
      return null;
    }

    const result = await prisma.subscriptions.findMany({
      where: {
        category: category
      }
    });

    return result.map((item) => mappingSubscription(item));
  } catch (error) {
    console.error('Error fetching subscription:', error);
    throw error;
  }
};

export function getPsPlusCoverByName(name: string) {
  switch (name) {
    case SubscriptionNames.PS_PLUS_DELUXE:
      return '/covers/ps-plus-deluxe.jpg';
    case SubscriptionNames.PS_PLUS_EXTRA:
      return '/covers/ps-plus-extra.jpg';
    case SubscriptionNames.PS_PLUS_ESSENTIAL:
      return '/covers/ps-plus-essential.jpg';
    default:
      return null;
  }
};

export function getTermDescription(term: number) {
  switch(term) {
    case 1:
      return '1 месяц';
    case 2:
      return '2 месяца';
    case 3:
      return '3 месяца';
    case 6:
      return '6 месяцев';
    case 12:
      return '12 месяцев';
    default:
      return '';
  }
};

export function getSubscriptionPoints(name: string) {
  switch (name) {
    case SubscriptionNames.PS_PLUS_DELUXE:
      return [
        "Игры месяца",
        "Возможность играть он-лайн",
        "Специальные скидки",
        "Эксклюзивный контент",
        "Облачное хранение",
        "Удаленное подключение (Share Play)",
        "Коллекция PS Plus",
        "Помощь в играх",
        "Каталог на 400+ игр",
        "Ubisoft+ Классика",
        "Классический каталог 100+ игр",
        "Пробный доступ к новинкам"
      ];
    case SubscriptionNames.PS_PLUS_EXTRA:
      return [
        "Игры месяца",
        "Возможность играть он-лайн",
        "Специальные скидки",
        "Эксклюзивный контент",
        "Облачное хранение",
        "Удаленное подключение (Share Play)",
        "Коллекция PS Plus",
        "Помощь в играх",
        "Каталог на 400+ игр",
        "Ubisoft+ Классика"
      ];
    case SubscriptionNames.PS_PLUS_ESSENTIAL:
      return [
        "Игры месяца",
        "Возможность играть он-лайн",
        "Специальные скидки",
        "Эксклюзивный контент",
        "Облачное хранение",
        "Удаленное подключение (Share Play)",
        "Коллекция PS Plus",
        "Помощь в играх"
      ];
    case SubscriptionNames.UBISOFT_PLUS:
      return [
        "Доступ к коллекции знаменитых игр Ubisoft",
        "Скидки на игры от Ubisoft",
      ];
    case SubscriptionNames.GTA_PLUS:
      return [
        "Ежемесячное начисление виртуальной валюты для онлайн режима",
        "Экслюзивные бонусы для игр Rockstar Games"
      ];
    case SubscriptionNames.EA_PLAY:
      return [
        "Доступ к каталогу The Play List с множеством игр от EA",
        "Пробный доступ на 10 часов к играм Electronic Arts",
        "Доступ к внутреигровым бонусам",
        "Скидка на игры от EA"
      ];
    default:
      return [];
  }
}
