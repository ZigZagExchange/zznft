import {GetServerSideProps} from "next";
import {jsonify} from "../../helpers/strings";
import {css} from "../../helpers/css";
import Pane from "../../components/Pane/Pane";
import {DevToggle} from "../../environment/Dev";
import Link from "next/link";
import {Account, Metadata, NFT} from "../../interfaces";
import {Http} from "../../services";

interface NFTProps {
  nft: NFT;
  ownerAccount: Account;
  minterAccount: Account;
}

export default function NFT({nft, ownerAccount, minterAccount}: NFTProps) {
  const metadata = nft.metadata as Metadata
  return <div className={css("mt-5", "px-24")}>
    {metadata && <div>
      <div>
        <div className={css("w-100", "px-8", "py-28", "flex", "justify-center", "items-center")}>
          <img src={metadata.image}/>
        </div>
        <div className={css("flex", "justify-between", "items-center", "mt-10")}>
          <div className={css("text-3xl")}>{metadata.name}</div>
          <div>
            <div>{ownerAccount.displayName}</div>
            <div className={css("text-right", "text-sm", "text-neutral-400")}>owner</div>
          </div>
        </div>
        <div className={css("mt-16", "grid", "grid-cols-6", "gap-5")}>
          <div className={css("col-span-2", "gap-5")}>
            <Pane title={"Attributes"}>
              <div className={css("grid", "grid-cols-2", "gap-5")}>
                {metadata.attributes.map((item, index) => <div key={`metadata-${index}`} className={css("bg-black", "p-2")}>
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
                <div>{nft.token_id}</div>
              </div>
              <div className={css("flex", "justify-between", "mb-3")}>
                <div className={css("text-neutral-400")}>Metadata</div>
                {/*TODO: NEED TO CONVERT contentHash BACK TO CID & LINK TO METADATA IN IPFS*/}
                <div></div>
              </div>
              <div className={css("flex", "justify-between")}>
                <div className={css("text-neutral-400")}>Creator</div>

                <Link href={`/profile/${minterAccount.displayName}`}>
                  <a className={css("hover:underline")}>{minterAccount.displayName}</a>
                </Link>
              </div>
            </Pane>
          </div>
        </div>
      </div>

      <DevToggle>
        <div className={css("break-all")}>
          <div>
            {jsonify(ownerAccount)}
          </div>
          <div className={css("mt-5")}>
            {jsonify(minterAccount)}
          </div>
          <div className={css("mt-5")}>
            {jsonify(metadata)}
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
  const nft: NFT = await Http.get("/nft", {params: {token_id: Number(id)}})
  if (!nft) {
    throw Error("Could not find token")
  }

  const ownerAccount: Account = await Http.get("/account", {params: {id: nft.ownerId}})
  const minterAccount: Account = await Http.get("/account", {params: {id: nft.minterId}})
  if (!ownerAccount || !minterAccount) {
    throw Error("Could not get owner or minter account")
  }
  return {
    props: {
      nft,
      ownerAccount,
      minterAccount
    }
  }
}

