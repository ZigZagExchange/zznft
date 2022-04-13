
export interface NFT {
  id: number;
  address: string;
  createdAt: string;
  updatedAt: string;
  tokenId: string;
  metadata: string;
  ownerAddress: string;
  creatorAddress: string;
  zkContentHash: string;
  metadataCID: string;
}

export interface Account {
  id: string;
  email: string;
  displayName: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export type Attributes = {trait_type: string, value: string}

export interface Metadata {
  description: string;
  external_url?: string;
  image: string;
  name: string;
  attributes: Attributes[]
}

export type ErrorCodes = 400 | 404 | 500

export interface Order {
  id: number;
  nftTokenId: number;
  nonce: number;
  // TODO: JSON or JSONB when we move to postgres
  zkOrder: string
}
