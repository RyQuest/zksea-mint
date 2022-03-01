import { useState, useEffect } from "react";
import Connect from "./helpers/Connect";
import { login } from "./reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Transaction } from "./helpers/Transaction";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const url = "http://52.14.90.31:3001/random-NFT";
function App() {
  const [counter, setcounter] = useState(0);

  const [loading, setloading] = useState(false);

  const [ethPrice, setethPrice] = useState(0);
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state) => state.auth.value.isAuthenticated
  );

  const loginUser = useSelector((state) => state.auth.value.user);

  function inc() {
    if (counter < 5) {
      setcounter(counter + 1);
    } else {
      setcounter(5);
    }

    if (ethPrice === 0) {
      setethPrice(".069");
    }

    if (ethPrice === ".069") {
      setethPrice(".138");
    }

    if (counter === 2) {
      setethPrice(".207");
    }

    if (counter === 3) {
      setethPrice(".276");
    }

    if (counter === 4) {
      setethPrice(".345");
    }
  }

  function decr() {
    if (counter > 0) {
      setcounter(counter - 1);
    } else {
      setcounter(0);
    }

    if (ethPrice === ".345") {
      setethPrice(".276");
    }

    if (ethPrice === ".276") {
      setethPrice(".207");
    }

    if (ethPrice === ".207") {
      setethPrice(".138");
    }

    if (ethPrice === ".138") {
      setethPrice(".069");
    }

    if (ethPrice === ".069") {
      setethPrice(0);
    }
  }

  function max() {
    setcounter(5);
    setethPrice(".345");
  }

  const handleLogin = async () => {
    let address = await Connect();
    console.log("address", address);

    if (address == null) {
      toast.error("Please switch to ropsten network", {
        position: "top-center",
      });
    } else {
      dispatch(
        login({
          user: {
            // balance: log.Balance,
            address: address[0],
          },
          isAuthenticated: true,
        })
      );

      console.log("login", loginUser);
    }
  };

  const handleBuy = async () => {
    if (isAuthenticated) {
      setloading(true);
      let price = parseFloat(ethPrice);
      let tx = {
        from: loginUser.address,
        to: "0x15C989EC8d1b4AF23894900a624889B33d0Dc645",
        gas: 500000,
        value: "0x" + (price * 1000000000000000000).toString(16),
      };
      let txr = await Transaction(tx);
      console.log("txr", txr);

      if (txr == false) {
        toast.error("Something went wrong!", {
          position: "top-center",
        });
      } else {
        let res = await axios.post(url, {
          address: loginUser.address,
          price: price,
          hash: txr.transactionHash,
        });
        console.log("res", res);

        setloading(false);

        toast("Transation successful", {
          position: "top-center",
        });
      }
    } else {
      await handleLogin();
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="header">
        {loading && (
          <div className="text-center">
            <div className="spinner-border text-white"></div>
          </div>
        )}
        {/* <div className="logo"><img src="/images/LOGO-main.png" alt="" /></div> */}
        <div className="logo">
          <img src="/images/logo-bull.png" alt="" />
        </div>

        <button onClick={() => handleLogin()} className="connectWallet">
          CONNECT WALLET
        </button>
      </div>
      <div className="main">
        {/* <h1>MINT YOUR zkAPES</h1> */}
        <h1>MINT YOUR Bullish Freaks</h1>


        <div className="card">
          <div className="cardFlex1">
            <h2 className="aaa">10,000 NFTs</h2>
          </div>

          <div className="cardFlex1">
            <div className="innerCont">
              <h2>MY ETH BALANCE</h2>
              <h3>0 ETH</h3>
            </div>

            <div className="middle">
              <h2>AMOUNT</h2>
              <div className="ggg">
                <button onClick={decr}>-</button>
                <span>{counter}</span>
                <button onClick={inc}>+</button>
              </div>
              <button className="max" onClick={max}>
                Max
              </button>
            </div>

            <div className="innerCont">
              <h2>TOTAL PRICE</h2>
              <h3>{ethPrice} ETH</h3>
            </div>

            <div className="cardFlex1 mainBTN">
              <button onClick={handleBuy}>Mint Now</button>
            </div>
          </div>
        </div>

        <div className="darkBackground"></div>
        {/* <img src="/images/mainBG.jpeg" className="background" alt="" /> */}
        <img src="/images/bg-bull.png" className="background" alt="" />
      </div>

      <div className="footer">
        <p>Copyright © 2022 zkAPES, All Right Reserved</p>
      </div>
    </>
  );
}

export default App;
