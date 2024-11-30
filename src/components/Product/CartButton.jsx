
const CartButton = ({product,index,add_to_cart,isModal}) => {

  const addItem = (type) => {
    // console.log(index,"index");
    // console.log(product,"product");
    add_to_cart({item:product,index:index,type:type})
  }


  return (
    <>
     {product.quantity ? <>
     <div className={`primary_bg flex items-center ${isModal ? 'rounded-[6px]' : 'rounded-[0_0_6px_6px]'} `}>
     <button onClick={()=> addItem('dec')} className={`text-sm capitalize h-9 ${isModal ? 'rounded-[6px]' : 'rounded-[0_0_6px_6px]'}  primary_bg text-white w-full`}>-</button>
     <span className="text-sm text-white">{product.quantity}</span>
     <button onClick={()=> addItem('inc')} className={`text-sm capitalize h-9 ${isModal ? 'rounded-[6px]' : 'rounded-[0_0_6px_6px]'}  primary_bg text-white w-full`}>+</button>
     </div>
     </> : <div>
        <button onClick={()=> addItem('inc')} className={`text-sm capitalize h-9 rounded-[0_0_6px_6px]  primary_bg text-white w-full`}>Add to cart</button>
        </div>} 
    </>
  )
}

export default CartButton
