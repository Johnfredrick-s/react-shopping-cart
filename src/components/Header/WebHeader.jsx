import { useState } from "react";
import Rodal from 'rodal';

// include styles
import 'rodal/lib/rodal.css';
import SliderCart from "../Product/SliderCart";
const WebHeader = () => {

  const [visible,setVisible] = useState(false)
  const showCart = () => {
    document.body.style.overflow="hidden"
    setVisible(true)

  }

  const hide = () => {
    document.body.style.overflow="auto"
    setVisible(false)
  }
  return (
    <>

    {visible && <div className="carts">
      <Rodal visible={visible} animation="slideRight" onClose={hide}>
      <SliderCart hide={hide} />
      </Rodal>
    </div>}
      
      <div className="primary_bg h-11 lg:sticky top-0 z-[99]">
        <div className={`flex h-full items-center gap-5 justify-between main_width`}>
          <div>
            <h6 className="text-lg text-white">Shopping Cart</h6>
          </div>

          <div onClick={showCart}>
            <img src="/header/cart.svg" className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default WebHeader;
