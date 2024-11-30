import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { getProducts } from '../libs/api'
import Product from '../components/Product/Product'
import { CartItems } from '../libs/context/CartItems'
const Products = () => {

  const { cart, setCart } = useContext(CartItems)
  const [products, setProducts] = useState([])
  const [dummyProducts, setDummyProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const searchTimeout = useRef(null);


  useEffect(() => {
    // console.log(cart, "cart")
    setIsLoading(true)
    get_products()
    cart_items()
  }, [])

  const cart_items = async () => {
    const data = localStorage['cart_items'] ? JSON.parse(localStorage['cart_items']) : null
    if (data) {
      setCart(data)
    } else {
      setCart([])
    }
  }


  const get_products = async () => {
    const response = await getProducts()
    if (response && response.length > 0) {
      // console.log(response, "response")
      setProducts(response)
      setDummyProducts(response)
      setCartItems()
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setProducts([])
      setDummyProducts([])
    }
  }

  const add_to_cart = async (data) => {

    if (cart && cart.length > 0) {
      let cartItem = cart.findIndex(item => item.productId === data.item.id)
      let cartValues = cart
      if (cartItem > -1) {
        if (data.type === 'inc') {
          cartValues[cartItem].quantity = cartValues[cartItem].quantity ? cartValues[cartItem].quantity + 1 : 1
        } else {
          cartValues[cartItem].quantity = cartValues[cartItem].quantity - 1
        }

        if (cartValues[cartItem].quantity == 0) {
          cartValues.splice(cartItem, 1)
        }
      } else {
        let param = { ...data.item, productId: data.item.id, quantity: 1 }
        cartValues = [...cartValues, param]
      }
      localStorage['cart_items'] = JSON.stringify(cartValues)
    } else {
      let param = { productId: data.item.id, quantity: 1 }
      let cartItem = [{ ...data.item, ...param }]
      localStorage['cart_items'] = JSON.stringify(cartItem)
    }


    cart_items()
  }

  const setCartItems = () => {
    if (products && products.length > 0) {
      setProducts(products => {
        products.map(res => {
          let count = 0
          if (cart && cart.length > 0) {
            cart.map(item => {
              if (item.productId == res.id) {
                count = item.quantity
              }
            })
          }
          res['quantity'] = count
        })
        return [...products]
      })
    }
  }

  useMemo(() => {
    setCartItems()
  }, [cart,isLoading])


  const searchItems = (e) => {
    

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      if(e.target.value){
        setProducts(products => {
          let value = dummyProducts
          return value.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
      })
      }else{
        setProducts([...dummyProducts])
        get_products()
      }
    }, 1000);
   
  }



  if (isLoading) {
    return <div className='loading-container'>
      <div className='spinner'></div>
      <h6>Loading...</h6>
    </div>
  }


  return (
    <div className={`main_width`}>
      <div className="flex items-center justify-between gap-4 w-full py-5">
      <h3 className={`font-semibold text-lg  `}>Products</h3>
      <input type='text' className='search-input' placeholder='Search' onChange={searchItems} />
      </div>
      <Product products={products} add_to_cart={add_to_cart} />
    </div>
  )
}

export default Products
