import { useAnchorWallet, useConnection, useWallet, } from "@solana/wallet-adapter-react";
import { AnchorProvider, BN, Program } from "@project-serum/anchor";
import idl from "../idl/idl.json";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";

import { config, Toast } from "../config/config"

export const NftBidding = () => {
    
    const [bidValue, setBidValue] = useState(0);
    const [bidData, setBidData] = useState<any>({});
    
    const programId = new PublicKey(idl?.metadata.address);
    const { connection } = useConnection();
    const walletAdapter = useAnchorWallet();
    const fetchData = async () => {
        if (walletAdapter && idl) {
            const provider = new AnchorProvider(connection, walletAdapter, {
                preflightCommitment: "processed",
                commitment: "processed",
            });
            const program = new Program(JSON.parse(JSON.stringify(idl)), programId, provider);
            const data = await program.account.nftSale.fetch(new PublicKey(config.nftSaleAccountPublicKey));
            setBidData(data);
            console.log("data is ", data);
        }
        else {
            Toast.fire({
                icon: 'error',
                title: "Connect wallet"
            });
        }
    }

    const placeBid = async () => {
        if (walletAdapter && idl && (bidValue > 0)) {
            const provider = new AnchorProvider(connection, walletAdapter, {
                preflightCommitment: "processed",
                commitment: "processed",
            });
            const program = new Program(JSON.parse(JSON.stringify(idl)), programId, provider);
           await program.methods.bid(new BN(bidValue)).accounts({
                nftOnSale: new PublicKey(config.nftSaleAccountPublicKey)
            }).signers([]).rpc();
            fetchData();
            Toast.fire({
                icon: 'success',
                title: "Bid placed sucessfully!"
            });
           
        }
        else {
            Toast.fire({
                icon: 'error',
                title: (bidValue <= 0 ? "Bid Value cant be less than 1" : "Connect wallet")
            });
        }
    }
    return (<>
        <button onClick={fetchData}>Fetch</button>
        <h3>
            NFT Mint : {bidData?.nftMint?.toString()}
        </h3>
        <h3>
            Max Bid Value : {bidData?.maxBidValue?.toString()}
        </h3>
        <div>
            <input type="number" onChange={(event) => setBidValue(parseInt(event.target.value))}></input>
            <button onClick={() => { placeBid() }}>Place Bid</button>

        </div>
        <table>
            <th>Bidder</th>
            <th>Value</th>
            {bidData?.bids?.map((bid: any) => {

                return (
                    <tr>
                        <td>{bid.bidder.toString()}</td>
                        <td>{bid.value.toString()}</td>
                    </tr>
                );
            })}
        </table>

    </>)
}