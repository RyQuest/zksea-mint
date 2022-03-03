import * as zksync from "zksync";
import * as ethers from "ethers";
import { toast } from "react-toastify";
const bs58 = require("bs58");
var Buffer = require("buffer/").Buffer;

export const zkTransfer = async (price) => {
    let Status = false
    let hash = ""
    console.log("wallet connect");
    await window.ethereum.enable();
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    const signer = provider.getSigner();
  
    console.log("signer", signer);
  
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

  
    let finaliPrice= price
    finaliPrice = finaliPrice.toString()
    const fee = ethers.utils.parseEther("0.0001");


    if(Balance < (finaliPrice + fee)){
        toast.error("Insufficient funds", {
            position: "bottom-center",
            });
            Status = false
    }
    // if (verifiedETHBalance < finaliPrice) {

      const deposit = await syncWallet.syncTransfer({
        to: "0xf04f23EBf26c8cE4369a5ac2049D6c283f868C11",
        token: "ETH",
        amount: ethers.utils.parseEther(finaliPrice),
        fee : fee
      });
      
      try {
        const depositReceipt = await deposit.awaitReceipt();
        hash  ="0xbdac7668775fa31d618f879c68e31273a5d0a61b5107eb559d777ea368978ea4"
        console.log("depositReceipt", depositReceipt);
        console.log("hash", hash);
        Status = true
  
        console.log("verified in depositReceipt", depositReceipt.block.verified);
        
          
        // }
      } catch (e) {
        console.log(e);
      }
    // }


    return {
      Balance,
      address,
      Status,
      hash
    };
};


// export async function zkTransfer(){

//     await window.ethereum.enable()
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     console.log("signer",signer);
//     const syncProvider = await zksync.getDefaultProvider("rinkeby");
//     const syncWallet = await zksync.Wallet.fromEthSigner(signer, syncProvider);
//     console.log("syncWallet",syncWallet);
    
//     const address = syncWallet.address();
    
//     console.log("address",address);
    
//     const verifiedETHBalance = await syncWallet.getBalance("ETH", "verified");
    
//     console.log("Balance _____", verifiedETHBalance)
//     const balance = await syncWallet.getEthereumBalance('ETH')
//     console.log("balance",balance);

//     let temp = await syncWallet.isSigningKeySet()
//     console.log("await syncWallet.isSigningKeySet()", temp);

//      try {
//         const changePubkey = await syncWallet.setSigningKey({
//             feeToken: "ETH",
//             ethAuthType: "ECDSA",
//             });
    
//             // Wait until the tx is committed
//             await changePubkey.awaitReceipt();
//      } catch (error) {
//          console.log("Error", error);
//      }

//     if (!(await syncWallet.isSigningKeySet())) {
//         if ((await syncWallet.getAccountId()) == undefined) {
//         throw new Error("Unknown account");
//         }

//         console.log("isSigningKeySet");

//         // As any other kind of transaction, `ChangePubKey` transaction requires fee.
//         // User doesn't have (but can) to specify the fee amount. If omitted, library will query zkSync node for
//         // the lowest possible amount.
//         const changePubkey = await syncWallet.setSigningKey({
//         feeToken: "ETH",
//         ethAuthType: "ECDSA",
//         });

//         // Wait until the tx is committed
//         await changePubkey.awaitReceipt();
//     }

//     const fee = ethers.utils.parseEther("0.001");
  
//     const transfer =  syncWallet.syncTransfer({
//       to: "0xf04f23EBf26c8cE4369a5ac2049D6c283f868C11",
//       token: "ETH",
//       amount: ethers.utils.parseEther("0.1"),
//       fee
//     });
//     const transferReceipt =  transfer.finally();
    
//     console.log("transferReceipt",transferReceipt);
    
//     // Get state of account
//     const state = await syncWallet.getAccountState(address);
//     // View committed NFTs
//     console.log("commited",state.committed.balances);
//     // View verified NFTs
//     console.log("verified",state.verified.balances);
//     }