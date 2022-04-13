import {GetServerSideProps} from "next";
import {jsonify} from "../../helpers/strings";
import {css} from "../../helpers/css";
import Pane from "../../components/Pane/Pane";
import {DevToggle} from "../../environment/Dev";
import {Attributes, Metadata, NFT, Order} from "../../interfaces";
import {Http} from "../../services";
import useDisplayName from "../../hooks/useDisplayName";
import Link, {LinkSize} from "../../components/Link/Link"
import Form from "../../components/Form/Form";
import {Submit} from "../../components/Button/Button";
import SelectInput from "../../components/Form/SelectInput";
import {useMemo, useState} from "react";
import TextInput from "../../components/Form/TextInput";
import {observer} from "mobx-react";
import NftDetailStore from "../../store/NftDetail.store";

interface NFTProps {
  nft: NFT;
  order: Order | null
}

const NonFungible = observer(({nft, order}: NFTProps) => {
  const {displayName: ownerName} = useDisplayName(nft.ownerAddress)
  const {displayName: creatorName} = useDisplayName(nft.creatorAddress)
  const store = useMemo(() => new NftDetailStore(nft), [])

  const [currencySelect, setCurrencySelect] = useState("ETH")
  const [amount, setAmount] = useState("0")

  return <>
    {store.metadata && <div className={css("mt-5", "px-24")}>
      <div>
        <div className={css("w-100", "px-8", "py-28", "flex", "justify-center", "items-center")}>
          <img src={store.metadata.image}/>
        </div>
        <div className={css("flex", "justify-between", "items-center", "mt-10")}>
          <div className={css("text-3xl")}>{store.metadata.name}</div>
          <div>
            <div>{ownerName}</div>
            <div className={css("text-right", "text-sm", "text-neutral-400")}>owner</div>
          </div>
        </div>
        <div className={css("mt-16", "grid", "grid-cols-6", "gap-5")}>
          <div className={css("col-span-2", "gap-5")}>
            <div>
              <Pane title={"List For Sale"} className={css("mb-5")}>
                <Form onSubmit={async () => alert("list")}>
                  <div className={css("grid", "grid-cols-2")}>
                    <SelectInput
                      label={"Currency"}
                      name={"currency"}
                      value={currencySelect}
                      onChange={(val) => setCurrencySelect(val)}
                      items={[{name: "ETH", id: "ETH"}, {name: "USDC", id: "USDC"}]}
                      defaultValue={currencySelect}
                    />
                    <TextInput
                      label={"Amount"}
                      name={"amount"}
                      value={amount}
                      onChange={(amount) => setAmount(amount)}
                    />
                  </div>
                  <Submit label={"List"} block className={css("mt-6")}/>
                </Form>
              </Pane>
              <Pane title={"Attributes"}>
                <div className={css("grid", "grid-cols-2", "gap-5")}>
                  {store.isAttributesValid && store.attributes && store.attributes.length > 0 && store.attributes.map((item, index) => <div key={`metadata-${index}`} className={css("bg-black", "p-2")}>
                    <div className={css("text-sm", "text-neutral-400")}>{item.trait_type}</div>
                    <div>{item.value}</div>
                  </div>)}
                  {!store.isAttributesValid && <div className={css("text-center", "col-span-2", "my-5", "text-neutral-400")}>
                    none found
                  </div>}
                </div>
              </Pane>
            </div>
          </div>
          <div className={css("col-span-4", "bg-neutral-900")}>
            <Pane title={"Info"}>
              <div className={css("text-neutral-200")}>
                {store.metadata.description}
              </div>
            </Pane>
          </div>
          <div className={css("col-span-2")}>
            <Pane title={"Details"}>
              <div className={css("flex", "justify-between", "mb-3")}>
                <div className={css("text-neutral-400")}>Token ID</div>
                <div>{nft.tokenId}</div>
              </div>
              <div className={css("flex", "justify-between", "mb-3")}>
                <div className={css("text-neutral-400")}>Metadata</div>
                <div>
                  <Link
                    isExternal
                    href={`https://ipfs.io/ipfs/${nft.metadataCID}`}
                    size={LinkSize.lg}
                  />
                </div>
              </div>
              <div className={css("flex", "justify-between")}>
                <div className={css("text-neutral-400")}>Creator</div>

                <Link href={`/profile/${nft.creatorAddress}`}>
                  {creatorName}
                </Link>
              </div>
            </Pane>
          </div>
        </div>
      </div>
    </div>}

    {!store.metadata && <div className={css("w-full", "h-full", "flex", "justify-center", "items-center")}>
      <div>No metadata found 🥸</div>
    </div>}

    <DevToggle>
      <div className={css("break-all")}>
        <div>
          {jsonify(nft)}
        </div>
        <div className={css("mt-5")}>
          {jsonify(store.metadata)}
        </div>
      </div>
    </DevToggle>
  </>
})

export const getServerSideProps: GetServerSideProps<NFTProps> = async (context) => {
  const {id} = context.query
  const nftRes = await Http.get<NFT[]>("/nft", {params: {tokenId: Number(id)}})
  const nft = nftRes.data[0]

  const orderRes = await Http.get<Order[]>("/order", {params: {nftTokenId: Number(nft.tokenId)}})
  const order = orderRes.data[0]
  console.log("debug:: nft", nft)
  console.log("debug:: order", order)

  if (!nft) {
    throw Error("Could not find token")
  }

  return {
    props: {
      nft,
      order: order ? order : null
    }
  }
}

export default NonFungible

