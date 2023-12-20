# Solana Nft Marketplace Task 
## Readme content

#### 1. Project Setup 
#### 2. Query Answers 


## Project Setup

### ⚙️ Solana Program Deployment 

Task's program code is in file nftMarketPlace.sol 


Deployment can be done using following methods

#### 🔵 using native anchor
 - Create new program using 'anchor init' command
 - Copy content from file nftMarketPlace.sol
 - Paste code in newly created lib.rs file from 'anchor init' 
 - Run command 'anchor build' in root directory
 - Run command 'anchor deploy' in root directory
    (make sure to replace programId)


#### 🔵 using solpg
- Head over to https://beta.solpg.io/
- Paste the code from nftMarketPlace.sol
- Navigate to the left side and click on "Build & Deploy."
- After deployment, click on "Test" located on the left side.
- Interact with the "Initialize" function by providing the arguments.
- Interact with the "bid" function by providing the same address of nftOnSale as provided at the time of initialization.
- Under "Accounts," fetch NftSale with the address or use "fetchAll" to view the history.

## ⚙️ Frontend Setup

- Install dependencies using 'npm install' in root folder
- Run project using 'npm start'


## Summary

* Currently it using default public key for nft sale, if you want to replace go to config foleder avaiable in the root and change the value present against "nftSaleAccountPublicKey"

* If you want to replace the ProgramId go to src folder in root then navigate to IDL and replace the value present under metadata => address

🔵 Click Fetch button to fetch Bid history of nft 

🔵 Place Bid using the input field followed by place bid button sign the transaction 

# 
# ⚙️ Query Answers

## How many entries can you store in your design?
The value currently set against MAX_BIDS is 30, and it can be changed at the time of deployment
##  How would you change your design if some hot item exceeds that limit?
Using Program-Derived Address (PDA) to place bids, We will increment the count present in the bid seed in PDA every time a bid is placed. This allows users to bid dynamically without worrying about the max limit. The bid seed contains (NFT mint, BidCount).


## How would you implement another feature that shows the bidding history of a user?

We will store the user's public key inside the bid PDA.On the frontend side, We will fetch the bids PDA and filter the ones having the same bidder address as the user.

## If it is allowed, would you consider storing the bidding history off-chain? Why or why not?

Yes, we can consider it saving off-chain, as it will reduce gas fees. This is because there can be hundreds of bids for a single item, and it can cost users to make a bid. Some users may avoid making bids, as they have to pay a fee even though they might not win the bid. On the other hand, as a con, keeping bidding history on-chain will make things transparent, as we will have an immutable track of each bid, and there will be no chance of bid manipulation.


