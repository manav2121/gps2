import React, { useState, useEffect } from "react"; 
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FiUser, FiShoppingCart } from 'react-icons/fi';
import { LuExpand, LuX } from "react-icons/lu";
import { BsHourglassSplit } from "react-icons/bs";
import logo1 from '../../assets/images/logo1.jpg';
import jar from '../../assets/images/jar.jpeg';
import clickSound from '../../assets/sounds/click.mp3';
import '../Header.css';
import { BiSupport } from "react-icons/bi";
import { IoWater } from "react-icons/io5";
import headd from '../../assets/images/headd.png';
import he from '../../assets/images/he.png';
import hee from '../../assets/images/hee.png';
import { IoWaterOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../../redux/slices/products/productSlices";

const Header = () => {
 

  const userInfo = localStorage.getItem('userInfo');
  const basePrice = 40;
  const [cartCount, setCartCount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [maxLimitReached, setMaxLimitReached] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
 
  useEffect(() => {
    localStorage.setItem("cartCount", cartCount);
    localStorage.setItem("totalPrice", basePrice * quantity);
  }, [cartCount, quantity]);

  const clickAudio = new Audio(clickSound);

  const openCartInNewTab = () => {
    window.open("/Cart", "_self");
  };

  const addToCart = () => {
    setQuantity(1);
    setCartCount(cartCount + 1);
    setMaxLimitReached(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
    clickAudio.play();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const increment = () => {
    if (quantity < 20) {
      setQuantity(prevQuantity => prevQuantity + 1);
      setCartCount(prevCount => prevCount + 1);
      setMaxLimitReached(false);
    } else {
      setMaxLimitReached(true);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      setCartCount(prevCount => prevCount - 1);
      setMaxLimitReached(false);
    } else {
      setQuantity(0);
      setCartCount(0);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setQuantity(0);
      setCartCount(0);
      setMaxLimitReached(false);
      return;
    }

    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 20) {
      setQuantity(parsedValue);
      setCartCount(parsedValue);
      setMaxLimitReached(false);
    } else if (parsedValue > 20) {
      setQuantity(20);
      setCartCount(20);
      setMaxLimitReached(true);
    }
  };

  const goToSignUp = () => {
    navigate("/sign-in"); // Redirect to the SignUp page
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchProductsAction()
    );
  }, [dispatch]);
  const {
    products,
    error,
    loading,
  } = useSelector((state) => state?.products);
  const navigate = useNavigate();


  if (loading) {
    return <h2 className="text-center text-xl text-gray-500">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-xl text-red-500">Error: {error}</h2>;
  }

  if (!products||!products.data||!products.data[0].image) {
    return <h2 className="text-center text-xl text-gray-500">No Product found.</h2>;
  }
// console.log(products.data)
  return (
    <>
      <div className={`headerWrapper ${openDialog ? 'dialogBackdropBlur' : ''}`}>
        <div className={`top-strip`}>
          <div className="container">
            <span className="marquee"><IoWaterOutline  /> &nbsp; Only in <b>Patna</b> at the moment  &nbsp; <IoWaterOutline  /></span>
          </div>
        </div>
      </div>

      <div className={`Header ${openDialog ? 'dialogBackdropBlur' : ''}`}>
        <div className="container">
          <div className="header d-flex align-items-center justify-content-between">
            <div className="logoWrapper d-flex align-items-center col-sm-2">
              <Link to={'/'}>
                <img src={hee} alt="logo" />
                
              </Link>
            </div>
            
            
            <div className="part3 d-flex align-items-center ml-auto">
              <div className="position-relative mr-2 cartTab">
              <Button className="circle button" onClick={openCartInNewTab}>
                  <span className="count">{cartCount}</span>
                  <FiShoppingCart className="sizebutton" />
                </Button>
                
                {userInfo ? (
        <CgProfile />
         ): (
            <Button onClick={goToSignUp} className="btn-blue btn-round mr-3">
               Sign In
            </Button>
         ) }
                
              </div>
              
            </div>
          </div>

          <div className="product_row w-100 d-flex justify-content-center">
            <div className="item productItem d-flex flex-column align-items-center">
              <div className="imgWrapper" style={{ position: "relative" }}>
                <img src={products.data[1].image} alt="Product Jar" className="productImage" />
                <Button
                  variant="text"
                  onClick={handleDialogOpen}
                  className="expandButton"
                  style={{ position: "absolute", top: "50px", left: "150px", color: "#000" }}
                >
                  <LuExpand size={24} />
                </Button>
              </div>

              

              <p className="price mt-3"><strong>Price:</strong> Rs.  ${products.data[1].price}</p>
              {products.data[1].qtyLeft <= 0 ? (
                <button
                  style={{ cursor: "not-allowed" }}
                  disabled
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-3 px-8 text-base font-medium text-whitefocus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Add to cart
                </button>
              ) : (
                <button
                  onClick={() => addToCartHandler()}
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Add to cart
                </button>
              )}
              {/* {quantity === 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addToCart}
                  className="mt-1"
                  style={{ fontSize: "0.8rem", padding: "10px 12px" }} // Corrected fontSize
                >
                  Add to Cart
                </Button>
              )}

              {quantity > 0 && (
                <div className="counterButtons d-flex align-items-center mt-3">
                  <Button variant="outlined" onClick={decrement}>-</Button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    style={{ width: "50px", margin: "0 5px", textAlign: "center" }}
                  />
                  <Button variant="outlined" onClick={increment}>+</Button>
                </div>
              )}

              {maxLimitReached && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  You have reached the maximum order limit.
                </p>
              )} */}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm" className="dialogBackground">
        <DialogTitle>
          Product Details
          <Button
            onClick={handleDialogClose}
            style={{ position: "absolute", top: "10px", right: "10px", color: "#000" }}
          >
            <LuX size={24} />
          </Button>
        </DialogTitle>
        <DialogContent className="dialogContent">
          <div className="expandedContent d-flex">
            <div className="imgWrapper" style={{ marginRight: "20px" }}>
              <img src={jar} alt="Product Jar" className="productImage" />
            </div>
            <div className="productDescription text-left">
              <h3>R.O Water</h3>
              <p>
                <b>Capacity:</b> 20 liters<br /><br />
                <b>Advanced Filtration:</b> Multi-stage RO filtration<br /><br />
                <b> Fresh:</b> Each jar is securely sealed to prevent contamination and ensure freshness on delivery.<br />
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <BsHourglassSplit size={32} /> {/* Corrected usage */}
            <h4>Reliable Delivery</h4>
            <p>You don't need to chase local vendors anymore. We bring the water to your doorstep daily 8 am to 8 pm.</p>
          </div>
          <div className="footer-section">
            <FiShoppingCart size={32}/>
            <h4>Extreme Convenience</h4>
            <p>You can quickly place an order in a few clicks and receive notifications about their order status and track deliveries in real time.

</p>
          </div>
          <div className="footer-section">
            < BiSupport size={32}/>
            <h4>Quick Support</h4>
            <p> If  we will try to resolve it as quickly as possible.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Header;
