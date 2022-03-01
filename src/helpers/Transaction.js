import { web3 } from "./Web3Helper"
export const Transaction=async(data)=>{
        
    let web3Connect=await web3();
    console.log('data',data);
     let hash=false;
    try{

         hash=await web3Connect.eth.sendTransaction(data);

       }catch(e){
        console.log(e);
    }
    return hash;
    
}