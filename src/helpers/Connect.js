import {web3} from "./Web3Helper";
const Connect=async()=>{
    const web3Connect=await web3()
    console.log('web3',web3Connect)
    
    const chainId = await web3Connect.eth.getChainId();
    console.log("chainId", chainId)

    if (chainId ==4) {
        const accounts = await web3Connect.eth.getAccounts();
        // console.log('accounts',accounts)
        return accounts;
    }else{
        return null
    }
    
}
export default Connect; 