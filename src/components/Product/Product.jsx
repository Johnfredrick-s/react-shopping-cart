import { currencyFormat } from "../../libs/helper";
import CartButton from "./CartButton";
const Product = ({ products,add_to_cart }) => {
  return (
    <>
      

      {products && products.length > 0 && (
        <>
          <div className="grid grid-cols-4 gap-5 md:grid-cols-2 md:gap-3">
            {products.map((res, i) => (
              <div key={res.id} className="border border-[#ddd] rounded-md relative min-h-[310px]">
                <div>
                  <img
                    src={res.image}
                    className="h-36 p-2 object-contain w-full rounded-[6px_6px_0_0]"
                    alt={res.title}
                  />
                </div>

                <div className="p-3">
                  <h4 className="text-md min-h-10 leading-5 font-semibold line-clamp-2">
                    {res.title}
                  </h4>
                  <p className="text-[12px] min-h-12 leading-5 text-[#a9a9a9] line-clamp-2 py-1">
                    {res.description}
                  </p>
                  <div className="flex item-center gap-2">
                    <h6 className="text-sm font-semibold">
                      {currencyFormat(res.price)}
                    </h6>
                    <div>
                      {/* {[0,1,2,3,4].map(r=>(

                  ))} */}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 w-full">
                  <CartButton product={res} index={i} add_to_cart={add_to_cart} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Product;
