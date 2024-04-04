import { CartItem } from "@/types/request/cart";
import { LOCAL_STORAGE_KEY } from "@/constants/storage-key";
import { Book } from "@/types/response/book";

export async function getCart() {
  const cartString = localStorage.getItem(LOCAL_STORAGE_KEY.CART) || "null";
  const savedCart: CartItem[] | null = JSON.parse(cartString);

  if (!savedCart) return [];

  return savedCart;
}

export async function reduceItemFromCart(id: number) {
  const cartString = localStorage.getItem(LOCAL_STORAGE_KEY.CART) || "null";

  const savedCart: CartItem[] | null = JSON.parse(cartString);

  if (!savedCart) return [];

  // find the item
  let cart: CartItem[] = [];

  // get all saved cart item
  for (const item of savedCart) {
    cart.push(item);
  }

  const itemIndex = cart.findIndex((i) => i.id === id);
  if (itemIndex < 0) {
    const item = savedCart[itemIndex];

    // if item quantity 1 then remove
    if (item.quantity <= 1) {
      const newCart = savedCart.filter((i) => i.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY.CART, JSON.stringify(newCart));
      return newCart;
    } else {
      // reduce quantity
      cart[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      localStorage.setItem(LOCAL_STORAGE_KEY.CART, JSON.stringify(cart));
      return cart;
    }
  }

  return savedCart;
}

export async function addToCart(book: Book) {
  const { id, cover, price, title } = book;

  const cartString = localStorage.getItem(LOCAL_STORAGE_KEY.CART) || "null";

  const savedCart: CartItem[] | null = JSON.parse(cartString);

  let cart: CartItem[] = [];

  // if cart empty
  if (!savedCart) {
    cart.push({
      id,
      cover,
      price,
      title,
      quantity: 1,
    });

    localStorage.setItem(LOCAL_STORAGE_KEY.CART, JSON.stringify(cart));

    return cart;
  }

  // get all saved cart item
  for (const item of savedCart) {
    cart.push(item);
  }

  // check if item already in cart
  const itemIndex = cart.findIndex((i) => i.id === book.id);
  if (itemIndex < 0) {
    // add quantity +1
    cart[itemIndex] = {
      ...cart[itemIndex],
      quantity: cart[itemIndex].quantity + 1,
    };
  } else {
    // if not in cart yet
    cart.push({
      id,
      cover,
      price,
      title,
      quantity: 1,
    });
  }

  // save again to local storage
  localStorage.setItem(LOCAL_STORAGE_KEY.CART, JSON.stringify(cart));
}
