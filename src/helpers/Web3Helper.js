import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

const providerOptions = {
    // / See Provider Options Section /

    walletconnect: {
        package: WalletConnectProvider,
        options: {
            rpc: {
                56: "https://bsc-dataseed.binance.org/",
            },
            network: "mainnet",
            chainId: 56,
            // infuraId: "bnb1a5cae5d9hp0we9cx9v02n9hvmt94nnuguv0fav",
        },
    },
};

const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required
    disableInjectedProvider: false,
});



export const web3 = async () => {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);

    return web3;
};


export const Provider=async()=>{
    const provider = await web3Modal.connect();

    return provider;
}
