
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
  // TODO: I don't think we need this
  assetCid: string;
}

export interface Account {
  id: string;
  email: string;
  displayName: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  description: string;
  external_url?: string;
  image: string;
  name: string;
  attributes: {trait_type: string, value: string}[]
}

export type ErrorCodes = 400 | 404 | 500
