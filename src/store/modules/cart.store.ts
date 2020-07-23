import { addProductToCart, CartI, CartProductT } from '../../utils/api/cart';

export interface CartStoreI extends CartI {
  init(): void;
  clear(): Promise<void>;
  deleteProduct(productId: string, idx: number, isParentDeletion?: boolean): Promise<void>;
  addProductToCart(productId: string, products: any[]): Promise<void>;
}

export const createCartStore = (): CartStoreI => ({
  products: [],
  init() {
    if (typeof window !== 'undefined') {
      const cart = localStorage.getItem('cart');
      if (cart) {
        this.products = JSON.parse(cart);
      }
    }
  },
  get price() {
    return this.products.reduce((prevPrice, { price }) => prevPrice + price, 0);
  },
  get count() {
    return this.products.reduce((prevCount, { count }) => prevCount + count, 0);
  },
  async addProductToCart(productId, products) {
    await addProductToCart(productId);
    const productIdx = this.products.findIndex((product) => product.id === productId);
    const currentProduct = products.find((product) => product.id === productId);
    if (productIdx !== -1 && currentProduct) {
      this.products[productIdx].products.push(currentProduct);
    } else if (currentProduct) {
      const cartData: CartProductT = {
        id: currentProduct.id,
        get price() {
          return this.products.reduce((prevPrice, { price }) => prevPrice + price, 0);
        },
        get count() {
          return this.products.length;
        },
        products: [currentProduct],
      };
      this.products.push(cartData);
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'cart',
        JSON.stringify(
          this.products.map((productData) => ({
            price: productData.products.reduce((prevPrice, { price }) => prevPrice + price, 0),
            count: productData.products.length,
            products: productData.products,
          })),
        ),
      );
    }
  },
  async deleteProduct(productId, idx, isParentDeletion = false) {
    const idxParent = this.products.findIndex((productData) => productData.id === productId);
    if (isParentDeletion && idxParent !== -1) {
      this.products.splice(idxParent, 1);
    } else if (idxParent !== -1) {
      this.products[idxParent].products.splice(idx, 1);
    }
  },
  async clear() {
    this.products = [];
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(this.products));
    }
  },
});
