1. Create a decentralised NFT Marketplace
  1. `ListItem`: List NFTs on the marketplace
  2. `buyitem`: But the NFTs
  3. `cancelItem`: Cancel a listing
  4. `updateListing`: Update a price
  5. `withdrawProceeds`: Withdraw payment for my bought NFTs

2. Attacks on blockchain
- Reentrancy
  - Prevention
    1. Easy way: Update the balance before calling any other external contract.
    2. Mutex: Database Systems using lock un-lock. Openzeppelin has it as a functionality.
- Oracle attack