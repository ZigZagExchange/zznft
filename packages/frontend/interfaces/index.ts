
export interface NFT {
  id: string;
  address: string;
  createdAt: string;
  updatedAt: string;

  // @TODO: not in sync with api right now
  token_id: string;
  metadata: Metadata;
  ownerId: string;
  minterId: string;
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