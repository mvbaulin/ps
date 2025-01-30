const tg = window.Telegram.WebApp;

export function useTelegram() {
  const onCloseApp = () => {
    tg.close();
  }

  const onToggleMainButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    }
    else {
      tg.MainButton.show();
    }
  }

  const onShowMainButton = () => {
    tg.MainButton.show();
  }

  const onHideMainButton = () => {
    tg.MainButton.hide();
  }

  const onToggleBackButton = () => {
    if (tg.BackButton.isVisible) {
      tg.BackButton.hide();
    }
    else {
      tg.BackButton.show();
    }
  }

  const onShowBackButton = () => {
    tg.BackButton.show();
  }

  const onHideBackButton = () => {
    tg.BackButton.hide();
  }

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    queryId: tg?.initDataUnsafe?.query_id,
    onCloseApp,
    onToggleMainButton,
    onShowMainButton,
    onHideMainButton,
    onToggleBackButton,
    onShowBackButton,
    onHideBackButton,
  }
}
