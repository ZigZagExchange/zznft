import {GetServerSideProps} from "next";
import * as zksync from "zksync";
import {vars} from "../../environment";
import {NFTInfo} from "zksync/src/types";
import {jsonfiy} from "../../helpers/strings";
import nftMetadata from "../../mocks/nftMetadata";
import {getDisplayName} from "next/dist/shared/lib/utils";
import useDisplayName from "../../hooks/useDisplayName";
import {css} from "../../helpers/css";
import Pane from "../../components/Pane/Pane";
import Dev, {DevToggle} from "../../environment/Dev";

export interface Metadata {
  description: string;
  external_url?: string;
  image: string;
  name: string;
  attributes: {trait_type: string, value: string}[]
}

interface NFTProps {
  info?: NFTInfo,
  metadata?: Metadata,
  owner?: number
}

export default function NFT({info, metadata, owner}: NFTProps) {
  const {displayName: ownerName} = useDisplayName(info?.address)
  const {displayName: creatorName} = useDisplayName(info?.creatorAddress)

  return <div className={css("mt-5", "px-24")}>
    {metadata && <div>
      <div>
        <div className={css("w-100", "bg-neutral-800", "px-8", "py-28", "flex", "justify-center", "items-center")}>
          <img src={metadata.image}/>
        </div>
        <div className={css("flex", "justify-between", "items-center", "mt-10")}>
          <div className={css("text-3xl")}>{metadata.name}</div>
          <div>
            <div>{owner}</div>
            <div className={css("text-right", "text-sm", "text-neutral-400")}>owner</div>
          </div>
        </div>
        <div className={css("mt-16", "grid", "grid-cols-6", "gap-5")}>
          <div className={css("col-span-2", "gap-5")}>
            <Pane title={"Attributes"}>
              <div className={css("grid", "grid-cols-2", "gap-5")}>
                {metadata.attributes.map(item => <div className={css("bg-black", "p-2")}>
                  <div className={css("text-sm", "text-neutral-400")}>{item.trait_type}</div>
                  <div>{item.value}</div>
                </div>)}
              </div>
            </Pane>
          </div>
          <div className={css("col-span-4", "bg-neutral-900")}>
            <Pane title={"Info"}>
              <div className={css("text-neutral-200")}>
                {metadata.description}
              </div>
            </Pane>
          </div>
          <div className={css("col-span-2")}>
            <Pane title={"Details"}>
              <div className={css("flex", "justify-between", "mb-3")}>
                <div className={css("text-neutral-400")}>Token ID</div>
                <div>{info?.id}</div>
              </div>
              <div className={css("flex", "justify-between", "mb-3")}>
                <div className={css("text-neutral-400")}>Metadata</div>
                <div>{info?.id}</div>
              </div>
              <div className={css("flex", "justify-between")}>
                <div className={css("text-neutral-400")}>Creator</div>
                <div>{creatorName}</div>
              </div>
            </Pane>
          </div>
        </div>
      </div>


      <DevToggle>
        <div className={css("break-all")}>
          <div>
            {jsonfiy(info)}
          </div>
          <div className={css("mt-5")}>
            {jsonfiy(metadata)}
          </div>
        </div>
      </DevToggle>
    </div>}

    {!metadata && <div>
      <div>No metadata found 🥸</div>
    </div>}
  </div>
}

export const getServerSideProps: GetServerSideProps<NFTProps> = async (context) => {
  const {id} = context.query
  let info
  let owner

  // TODO: query from IPFS/arweave
  const metadata = nftMetadata

  const syncProvider = await zksync.getDefaultProvider(vars.TARGET_NETWORK_NAME);
  if (id) {
    try {
      info = await syncProvider.getNFT(Number(id))
      owner = await syncProvider.getNFTOwner(Number(id))
      console.log("debug:: metadata", metadata)
    } catch (e) {
      console.error("Could not get token")
    }
  }

  return {
    props: {
      info,
      metadata,
      owner
    }
  }
}

