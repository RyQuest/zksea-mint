import { useState, useEffect } from "react";
import Connect from "./helpers/Connect";
import { zkSyncconnect } from "./helpers/zksyncConnect";
import { zkTransfer } from "./helpers/Transfer";
import { login } from "./reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Transaction } from "./helpers/Transaction";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Mint } from "./helpers/Mint";

const url = "https://api.zksea.xyz/random-NFT";
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
    if (counter < 1) {
      setcounter(counter + 1);
    } else {
      setcounter(1);
    }

    if (ethPrice === 0) {
      setethPrice("0");
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

    if (counter === 5) {
      setethPrice(".414");
    }

    if (counter === 6) {
      setethPrice(".483");
    }
    if (counter === 7) {
      setethPrice(".552");
    }
    if (counter === 8) {
      setethPrice(".621");
    }
    if (counter === 9) {
      setethPrice(".69");
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

    if (ethPrice === ".69") {
      setethPrice(".621");
     }

     if (ethPrice === ".621") {
      setethPrice(".552");
     }

     if (ethPrice === ".552") {
      setethPrice(".483");
     }

     if (ethPrice === ".483") {
      setethPrice(".414");
     }

     if (ethPrice === ".414") {
      setethPrice(".345");
     }
  }

  function max() {
    setcounter(1);
    setethPrice(0);
  }

  const handleLogin = async () => {

    let zksyncCon = await zkSyncconnect()

    console.log("zksyncCon", zksyncCon);

    // let address = await Connect();
    // console.log("address", address);

    if (zksyncCon.address == null) {
      toast.error("Please switch to Ethereum Mainnet", {
        position: "bottom-center",
      });
    } else {
      dispatch(
        login({
          user: {
            // balance: log.Balance,
            address: zksyncCon.address,
          },
          isAuthenticated: true,
        })
      );

      console.log("login", loginUser);
    }
  };

  const handleBuy = async () => {
    if (isAuthenticated) {
      let price = parseFloat(ethPrice);
      if(price != 0){
        toast.error("Amount cannot be zero", {
          position: "bottom-center",
        });
      }
      else{
        let checkalletres = await axios.post("https://api.zksea.xyz/check-wallet", {
          wallet_address: loginUser.address,
      });

      console.log("checkalletres", checkalletres);
      if(checkalletres.data.status == false){
        toast.error(checkalletres.data.message, {
          position: "right-center",
        });
        return
      }
       
        setloading(true);
       // let transfer = await zkTransfer(price)
       // console.log("transfer", transfer);
          const rstatus=true;
          if(rstatus == true){
  
            // successfull transfer now mint
            let res = await axios.post(url, {
                address: loginUser.address,
                price: price,
                hash: "free",
            });
            console.log("res", res);
  
            console.log("ipfs", res.data.ipfs_hash);
            console.log("contentid", res.data._id);
  
  
            let mintNFT = await Mint(res.data.ipfs_hash)
            console.log("mintNFT", mintNFT);
  
            let setToken = await axios.post("https://api.zksea.xyz//set-tokenId", {
              tokenId: mintNFT.NftToken,
              contentId: res.data._id,
            });
            console.log("setToken", setToken);
  
            toast("Transaction Successful", {
              position: "bottom-center",
            });
            setloading(false);
           
          }else{
            toast.error("Transaction Unsuccessful", {
              position: "bottom-center",
            });
          }
      }
    }
     else {
      toast.error("Please connect wallet", {
            position: "bottom-center",
      });
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
         {isAuthenticated?<span className="wallet-address"><p className="swl">{loginUser?.address.substring(0, 5)+"....."+loginUser?.address.substring(38, 42)}</p></span>:
           <button onClick={() => handleLogin()} className="connectWallet">
           CONNECT WALLET
         </button>}
        
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
            {loading?<button>Processing</button>: <button onClick={handleBuy}>Mint Now</button>}
              {/* <button onClick={handleBuy}>Mint Now</button> */}
            </div>
          </div>
        </div>

        <div className="darkBackground"></div>
        {/* <img src="/images/mainBG.jpeg" className="background" alt="" /> */}
        <img src="/images/bg-bull.png" className="background" alt="" />
      </div>

      <div className="footer">
        <p>Copyright ?? 2022 Bullish Freaks, All Right Reserved</p>
      </div>
    </>
  );
}

export default App;
