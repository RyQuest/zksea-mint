import * as zksync from "zksync";
import * as ethers from "ethers";
const bs58 = require('bs58')
var Buffer = require('buffer/').Buffer;

export const Mint= async(hash)=>{

    await window.ethereum.enable()

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    console.log("signer",signer);

    const syncProvider = await zksync.getDefaultProvider("rinkeby");
    
    const syncWallet = await zksync.Wallet.fromEthSigner(signer, syncProvider);

    console.log("syncWallet",syncWallet);
    
    const address = syncWallet.address();
    
    console.log("address",address);

    const nonce = await syncWallet.getNonce()
     console.log("address",address);
    
    const verifiedETHBalance = await syncWallet.getBalance("ETH", "verified");
    
    console.log("Balance _____", verifiedETHBalance)

    const balance = await syncWallet.getEthereumBalance('ETH')

    console.log("balance",balance);
    
    if(verifiedETHBalance==0)
    {
                
      const deposit = await syncWallet.depositToSyncFromEthereum({
        depositTo: syncWallet.address(),
        token: "ETH",
        amount: ethers.utils.parseEther("0.01"),
      });
      
      try{
           
        const depositReceipt = await deposit.awaitReceipt();

        console.log("depositReceipt",depositReceipt);

       }catch(e){console.log(e)}
     

    }
    
    if (!(await syncWallet.isSigningKeySet())) {
      if ((await syncWallet.getAccountId()) == undefined) {
        throw new Error("Unknown account");
      }
    
      // As any other kind of transaction, `ChangePubKey` transaction requires fee.
      // User doesn't have (but can) to specify the fee amount. If omitted, library will query zkSync node for
      // the lowest possible amount.
      const changePubkey = await syncWallet.setSigningKey({
        feeToken: "ETH",
        ethAuthType: "ECDSA",
      });
    
      // Wait until the tx is committed
      await changePubkey.awaitReceipt();
    }


       // start
      //  const firstimeactivation = await syncWallet.setSigningKey({
      //   feeToken : "ETH",
      //   // fee: ethers.utils.parseEther("0.0001"),
      //   ethAuthType : "ECDSA"
      // });
      // const firstimeactivationReceipt =  (await firstimeactivation).awaitReceipt;

      // console.log("firstimeactivationReceipt",firstimeactivationReceipt);




    // const fee = ethers.utils.parseEther("0.001");
    console.log('ipfs hash',hash)
    hash=hash.toString();
    console.log('ipfs hash',hash)

    const bytes = Buffer.from(hash, 'hex')
    // let contentHash  = bs58.encode(bytes)
    //ethers.utils.formatBytes32String(hash) //"0xbd7289936758c562235a3a42ba2c4a56cbb23a263bb8f8d27aead80d74d9d996";
    let contentHash  = "0x"+bs58.decode(hash).slice(2).toString('hex')
    console.log('hash',contentHash)

    const mint =  syncWallet.mintNFT({
      recipient: syncWallet.address(),
      contentHash,
      feeToken: "ETH"
    });

    const nftReceipt = await mint.finally();
    
    console.log("nftReceipt",nftReceipt);

    console.log("nftdata",(await nftReceipt).txData);
    
    
    // Get state of account
    const state = await syncWallet.getAccountState(address);
    console.log("state",state);

    // View committed NFTs
    console.log("commited",state.committed.nfts);
    // View verified NFTs
    console.log("verified",state.verified.nfts);
    let nftData=Object.keys(state.committed.nfts);
    let NftToken="";
    nftData.forEach((token,index)=>{
      NftToken=token;
    })

    let mintObj={NftToken:NftToken,
                 address:address
                 }  
                 
    return mintObj;
  }