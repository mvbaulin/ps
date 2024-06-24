import { useNavigate } from "react-router";
import {useTelegram} from "./useTelegram";

export function useHistory() {
  const navigate = useNavigate();
  const {tg, onShowBackButton, onHideBackButton} = useTelegram();

  const onBack = () => {
    onShowBackButton();
    tg.BackButton.onClick(() => {
      navigate('/');
      onHideBackButton();
    })
  }

  return {
    onBack
  }
}
