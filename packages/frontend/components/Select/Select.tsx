import * as RadixSelect from "@radix-ui/react-select"
import {css} from "../../helpers/css";
import {BiChevronDown} from "react-icons/bi";

export type SelectItem = {name: string, id: string}

export interface SelectProps {
  items: SelectItem[];
  value: string;
  onChange: (value: string) => void;
  defaultValue: string;
  block?: boolean
}

const Select = ({items, value, onChange, defaultValue, block = false}: SelectProps) => {
  return <div>
    <RadixSelect.Root
      onValueChange={(value) => onChange(value)}
      value={value}
      defaultValue={defaultValue}
    >
      <RadixSelect.Trigger className={css("hover:bg-neutral-800", "bg-neutral-900", "inline-flex", "items-center", "justify-between", "px-2", "py-1", {"w-full": block})}>
        <RadixSelect.Value/>
        <RadixSelect.Icon className={css("ml-2")}>
          <BiChevronDown/>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Content className={css("overflow-hidden", "bg-neutral-700", "text-white")}>
        <RadixSelect.Viewport className={css("p-2")}>
          <RadixSelect.Group>
            {items.map(item => <RadixSelect.Item
              value={item.id}
              className={css("relative", "cursor-pointer", "hover:underline")}
            >
              <RadixSelect.ItemText>
                {item.name}
              </RadixSelect.ItemText>
              <RadixSelect.ItemIndicator/>
            </RadixSelect.Item>)}
          </RadixSelect.Group>

          <RadixSelect.Separator/>
        </RadixSelect.Viewport>
        <RadixSelect.ScrollDownButton/>
      </RadixSelect.Content>
    </RadixSelect.Root>
  </div>
}

export default Select
