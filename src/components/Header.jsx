import { useContext, useState } from "react";
import Moon from "../assets/icons/moon.svg";
import Logo from "../assets/logo.svg";
import Ring from "../assets/ring.svg";
import ShoppingCart from "../assets/shopping-cart.svg";
import { MovieContext } from "../context";
import CartDetails from "./CartDetails";

export default function Header() {
  const [showCart, setShowCart] = useState(false);

  const { cartData } = useContext(MovieContext);

  function handleCartDetails() {
    setShowCart(true);
  }
  function handleCloseCartModal() {
    setShowCart(false);
  }
  return (
    <>
      {showCart && <CartDetails onClose={handleCloseCartModal} />}
      <header>
        <nav className="container flex items-center justify-between space-x-10 py-6">
          <a href="index.html">
            <img src={Logo} width="139" height="26" alt="Logo" />
          </a>

          <ul className="flex items-center space-x-5">
            <li>
              <a
                className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
                href=""
              >
                <img src={Ring} width="24" height="24" alt="Ring" />
              </a>
            </li>
            <li>
              <a
                className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
                href=""
              >
                <img src={Moon} width="24" height="24" alt="Moon" />
              </a>
            </li>
            <li>
              <a
                className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
                href="#"
                onClick={handleCartDetails}
              >
                <img src={ShoppingCart} width="24" height="24" alt="Cart" />
                {cartData.length > 0 && (
                  <span className=" rounded-full absolute top-[-12px] left-[20px] bg-[#12cf6f] text-white text-center p-[2px] w-[30px] h-[30px]">
                    {cartData.length}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
