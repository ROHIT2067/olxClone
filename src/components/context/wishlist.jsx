import { useEffect, useState } from "react";
import { WishlistContext } from "./use-wishlist";
const STORAGE_KEY = "olx_wishlist";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem(STORAGE_KEY);
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error("Unable to save wishlist in browser storage:", error);
    }
  }, [wishlist]);

  const isWishlisted = (productId) =>
    wishlist.some((product) => product.id === productId);

  const addToWishlist = (product) => {
    setWishlist((current) =>
      current.some((item) => item.id === product.id)
        ? current
        : [...current, product],
    );
  };

  const removeFromWishlist = (productId) => {
    setWishlist((current) =>
      current.filter((product) => product.id !== productId),
    );
  };

  const toggleWishlist = (product) => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
