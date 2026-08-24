import { useState } from "react";
import Card from "../components/card/card";
import { ItemsContext } from "../components/context/item";
import { useWishlist } from "../components/context/use-wishlist";
import Login from "../components/modal/login";
import Sell from "../components/modal/sell";
import Navbar from "../components/navbar/navbar";

function Wishlist() {
  const [openModal, setModal] = useState(false);
  const [openModalSell, setModalSell] = useState(false);
  const itemsCtx = ItemsContext();
  const { wishlist } = useWishlist();

  const toggleModal = () => setModal((current) => !current);
  const toggleModalSell = () => setModalSell((current) => !current);

  return (
    <div>
      <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
      <Login toggleModal={toggleModal} status={openModal} />
      <Sell
        setItems={itemsCtx.setItems}
        toggleModalSell={toggleModalSell}
        status={openModalSell}
      />
      <Card
        items={wishlist}
        title="My wishlist"
        emptyMessage="Your wishlist is empty. Tap the heart on a product to save it."
      />
    </div>
  );
}

export default Wishlist;
