import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { ItemsContext } from "../context/item";
import { fireStore } from "../firebase/firebase";
import Login from "../modal/login";
import Sell from "../modal/sell";
import { useWishlist } from "../context/use-wishlist";

function Details(){
  const location = useLocation();
  const { productId } = useParams();
  const itemsCtx = ItemsContext();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const itemFromContext = itemsCtx?.items?.find((product) => product.id === productId);
  const [item, setItem] = useState(location.state?.item || itemFromContext || null);
  const [loading, setLoading] = useState(!item);

  const [openModal, setModal] = useState(false);
  const [openModalSell, setModalSell] = useState(false);
  const toggleModal = () => setModal(!openModal);
  const toggleModalSell = () => setModalSell(!openModalSell);

  useEffect(() => {
    if (item || !productId) return;

    const fetchProduct = async () => {
      try {
        const productSnapshot = await getDoc(doc(fireStore, "products", productId));
        if (productSnapshot.exists()) {
          setItem({ id: productSnapshot.id, ...productSnapshot.data() });
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [item, productId]);

  if (loading) {
    return <p className="p-10 text-center">Loading product details...</p>;
  }

  if (!item) {
    return <p className="p-10 text-center">Product not found.</p>;
  }

  return (
      <div>
          <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
          <Login toggleModal={toggleModal} status={openModal} />

          <div className="grid grid-cols-1 gap-5 px-5 pb-10 pt-28 sm:grid-cols-1 sm:px-15 md:grid-cols-2 md:px-30 lg:px-40">
              <div className="border-2 w-full rounded-lg flex justify-center overflow-hidden h-96">
               
                  <img className="object-cover" src={item?.imageUrl} alt={item?.title} />
              </div>
              <div className="flex flex-col relative w-full">
                  <button
                    type="button"
                    onClick={() => toggleWishlist(item)}
                    className={`mb-4 self-start rounded-md border-2 border-[#002f34] px-4 py-2 font-semibold ${
                      isWishlisted(item.id) ? "bg-[#002f34] text-white" : "bg-white text-[#002f34]"
                    }`}
                  >
                    {isWishlisted(item.id) ? "Remove from wishlist" : "Add to wishlist"}
                  </button>
           
                  <p className="p-1 pl-0 text-2xl font-bold">₹ {item?.price}</p>
                  <p className="p-1 pl-0 text-base">{item?.category}</p>
                  <p className="p-1 pl-0 text-xl font-bold">{item?.title}</p>
                  <p className="p-1 pl-0 sm:pb-0 break-words text-ellipsis overflow-hidden w-full">
                      {item?.description}
                  </p>
                  <div className="w-full relative sm:relative md:absolute bottom-0 flex justify-between">
                      <p className="p-1 pl-0 font-bold">Seller: {item?.userName}</p>
                      <p className="p-1 pl-0 text-sm">{item?.createdAt}</p>
                  </div>
              </div>
          </div>

          <Sell
            setItems={itemsCtx.setItems}
            toggleModalSell={toggleModalSell}
            status={openModalSell}
          />
      </div>
  );
}

export default Details
