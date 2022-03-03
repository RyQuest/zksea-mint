import * as zksync from "zksync";
import * as ethers from "ethers";
import { toast } from "react-toastify";
const bs58 = require("bs58");
var Buffer = require("buffer/").Buffer;

export const zkSyncconnect = async () => {
  let depositStatus = false
  let chaindIdStatus = true
  console.log("wallet connect");
  await window.ethereum.enable();

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  console.log("signer", signer);

  const chain = await provider.getNetwork()
  console.log("chain", chain.chainId);

  if(chain.chainId != 4){
    console.log("not match");
    toast.error("Please select rinkeby network", {
      position: "bottom-center",
  });
  }

  const syncProvider = await zksync.getDefaultProvider("rinkeby");

  const syncWallet = await zksync.Wallet.fromEthSigner(signer, syncProvider);

  console.log("syncWallet", syncWallet);

  let address = syncWallet.address();

  console.log("address", address);

  const verifiedETHBalance = await syncWallet.getBalance("ETH", "verified");

  console.log("Balance _____", verifiedETHBalance);
  let Balance = verifiedETHBalance.toString();
  Balance = parseFloat(Balance);
  Balance = Balance / 10 ** 18;
  console.log("Balancein number _____", Balance);

  // console.log("price", price);
  // if (price == "" || price == null || price == undefined) {
  //   price = "0.001";
  // }

  // let finaliPrice = price.toString();
  // console.log(typeof finaliPrice);

  let finaliPrice= "0.001"
  // finaliPrice = parseFloat(finaliPrice)

  if (verifiedETHBalance < finaliPrice) {
    toast("You do not have sufficient funds, please deposit amount to activate zksync", {
      position: "bottom-center",
    });
    const deposit = await syncWallet.depositToSyncFromEthereum({
      depositTo: syncWallet.address(),
      token: "ETH",
      amount: ethers.utils.parseEther(finaliPrice),
    });
    try {
      const depositReceipt = await deposit.awaitReceipt();

      console.log("depositReceipt", depositReceipt);
      depositStatus = true

      console.log("verified in depositReceipt", depositReceipt.block.verified);
      if (depositReceipt.block.verified === false) {
        console.log("verified block error");
        toast("Verify Your balance first", {
          position: "bottom-center",
        });
        
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  try {
    const changePubkey = await syncWallet.setSigningKey({
        feeToken: "ETH",
        ethAuthType: "ECDSA",
        });

        // Wait until the tx is committed
        await changePubkey.awaitReceipt();
 } catch (error) {
     console.log("Error", error);
 }

  
  toast("Wallet connect successful", {
    position: "bottom-center",
  });
  return {
    Balance,
    address,
    depositStatus
  };
};
