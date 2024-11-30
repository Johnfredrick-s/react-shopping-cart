import { useContext } from "react";
import { CartItems } from "../../libs/context/CartItems";
import { currencyFormat } from "../../libs/helper";
import CartButton from "./CartButton";

const SliderCart = () => {
  const { cart, setCart } = useContext(CartItems);

  const cart_items = async () => {
    const data = localStorage["cart_items"]
      ? JSON.parse(localStorage["cart_items"])
      : null;
    if (data) {
      setCart(data);
    } else {
      setCart([]);
    }
  };

  const add_to_cart = async (data) => {
    if (cart && cart.length > 0) {
      let cartItem = cart.findIndex((item) => item.productId === data.item.id);
      let cartValues = cart;
      if (cartItem > -1) {
        if (data.type === "inc") {
          cartValues[cartItem].quantity = cartValues[cartItem].quantity
            ? cartValues[cartItem].quantity + 1
            : 1;
        } else {
          cartValues[cartItem].quantity = cartValues[cartItem].quantity - 1;
        }

        if (cartValues[cartItem].quantity == 0) {
          cartValues.splice(cartItem, 1);
        }
      } else {
        let param = { ...data.item, productId: data.item.id, quantity: 1 };
        cartValues = [...cartValues, param];
      }
      localStorage["cart_items"] = JSON.stringify(cartValues);
    } else {
      let param = { productId: data.item.id, quantity: 1 };
      let cartItem = [{ ...data.item, ...param }];
      localStorage["cart_items"] = JSON.stringify(cartItem);
    }

    cart_items();
  };

  return (
    <div>
      <div className="pb-[15px]">
        <h3 className="text-lg font-semibold">Cart</h3>
      </div>

      <div className="sliderParent">
        {cart && cart.length > 0 ? (
          <>
            {cart.map((res, i) => (
              <div
                key={res.id + res.title}
                className="border border-[#ddd] p-3 rounded-md flex gap-3 mb-2"
              >
                <div className="flex-[0_0_calc(25%_-_10px)]">
                  <img
                    src={res.image}
                    className="h-36  object-contain w-full rounded-[6px_6px_0_0]"
                    alt={res.title}
                  />
                </div>

                <div className="relative">
                  <h4 className="text-md  leading-5 font-semibold line-clamp-2">
                    {res.title}
                  </h4>

                  <p className="text-[12px] leading-5 text-[#a9a9a9] line-clamp-1 py-1">
                    {res.description}
                  </p>

                  <h6 className="text-sm font-semibold">
                    {currencyFormat(res.price)}
                  </h6>

                  <div className="absolute bottom-0 w-full">
                    <CartButton
                      product={res}
                      index={i}
                      isModal={true}
                      add_to_cart={add_to_cart}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div>
              <h5>No Cart items found!</h5>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SliderCart;
