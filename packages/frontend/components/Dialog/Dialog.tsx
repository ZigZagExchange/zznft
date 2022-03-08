import * as RadixDialog from '@radix-ui/react-dialog';
import classNames from "classnames";

interface DialogProps extends React.ComponentProps<any> {
  open?: boolean;
  title?: string;
  description?: string;
}

const Dialog = ({children, open, title, description}: DialogProps) => {
  return <RadixDialog.Root>
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={classNames("w-full")}/>
      <RadixDialog.Content className={classNames("bg-white", "w-full", "h-full")}>
        <RadixDialog.Title title={title}/>
        <RadixDialog.Description title={description}/>
        <RadixDialog.Close/>
        <div className={classNames("bg-green-50")}>
          {children}
        </div>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
}

export default Dialog
