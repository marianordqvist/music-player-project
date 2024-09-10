import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchCardInfo, resetCardStatus } from "../state/MusicCard/MusicCardSlice";

function GetMusicCards() {
  const dispatch = useAppDispatch(); // extract states from Redux store
  const cardStatus = useAppSelector((state) => state.MusicCard.status);
  const error = useAppSelector((state) => state.MusicCard.error);
  const cards = useAppSelector((state) => state.MusicCard.cards);

  const fetchCards = () => {
    if (cardStatus !== "pending") {
      dispatch(resetCardStatus()); // Reset the status before fetching
      dispatch(fetchCardInfo());
    }
  };
  return { fetchCards, cardStatus, cards, error };
}

export default GetMusicCards;
