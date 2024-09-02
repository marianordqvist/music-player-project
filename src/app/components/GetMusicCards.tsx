import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../state/store";
import { fetchCardInfo, resetCardStatus } from "../state/MusicCard/MusicCardSlice";

function GetMusicCards() {
  const dispatch = useDispatch<AppDispatch>(); // extract states from Redux store
  const cardStatus = useSelector((state) => state.MusicCard.status);
  const error = useSelector((state) => state.MusicCard.error);
  const cards = useSelector((state) => state.MusicCard.cards);

  const fetchCards = () => {
    if (cardStatus !== "pending") {
      dispatch(resetCardStatus()); // Reset the status before fetching
      dispatch(fetchCardInfo());
    }
  };
  return { fetchCards, cardStatus, cards, error };
}

export default GetMusicCards;
