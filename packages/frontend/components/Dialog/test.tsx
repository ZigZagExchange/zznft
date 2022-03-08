import React from 'react';
// import { styled, keyframes } from '@stitches/react';
// import { violet, blackA, mauve, green } from '@radix-ui/colors';
// import { Cross2Icon } from '@radix-ui/react-icons';
// import * as DialogPrimitive from '@radix-ui/react-dialog';

// const overlayShow = keyframes({
//   '0%': { opacity: 0 },
//   '100%': { opacity: 1 },
// });
//
// const contentShow = keyframes({
//   '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
//   '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
// });
//
// const StyledOverlay = styled(DialogPrimitive.Overlay, {
//   backgroundColor: blackA.blackA9,
//   position: 'fixed',
//   inset: 0,
//   '@media (prefers-reduced-motion: no-preference)': {
//     animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
//   },
// });
//
// const StyledContent = styled(DialogPrimitive.Content, {
//   backgroundColor: 'white',
//   borderRadius: 6,
//   boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
//   position: 'fixed',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '90vw',
//   maxWidth: '450px',
//   maxHeight: '85vh',
//   padding: 25,
//   '@media (prefers-reduced-motion: no-preference)': {
//     animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
//   },
//   '&:focus': { outline: 'none' },
// });
//
// function Content({ children, ...props }) {
//   return (
//     <DialogPrimitive.Portal>
//       <StyledOverlay  />
//       <StyledContent {...props}>{children}</StyledContent>
//     </DialogPrimitive.Portal>
//   );
// }
//
// const StyledTitle = styled(DialogPrimitive.Title, {
//   margin: 0,
//   fontWeight: 500,
//   color: mauve.mauve12,
//   fontSize: 17,
// });
//
// const StyledDescription = styled(DialogPrimitive.Description, {
//   margin: '10px 0 20px',
//   color: mauve.mauve11,
//   fontSize: 15,
//   lineHeight: 1.5,
// });
//
// // Exports
// export const Dialog = DialogPrimitive.Root;
// export const DialogTrigger = DialogPrimitive.Trigger;
// export const DialogContent = Content;
// export const DialogTitle = StyledTitle;
// export const DialogDescription = StyledDescription;
// export const DialogClose = DialogPrimitive.Close;
//
// // Your app...
// const Flex = styled('div', { display: 'flex' });
// const Box = styled('div', {});
//
// const Button = styled('button', {
//   all: 'unset',
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: 4,
//   padding: '0 15px',
//   fontSize: 15,
//   lineHeight: 1,
//   fontWeight: 500,
//   height: 35,
//
//   variants: {
//     variant: {
//       violet: {
//         backgroundColor: 'white',
//         color: violet.violet11,
//         boxShadow: `0 2px 10px ${blackA.blackA7}`,
//         '&:hover': { backgroundColor: mauve.mauve3 },
//         '&:focus': { boxShadow: `0 0 0 2px black` },
//       },
//       green: {
//         backgroundColor: green.green4,
//         color: green.green11,
//         '&:hover': { backgroundColor: green.green5 },
//         '&:focus': { boxShadow: `0 0 0 2px ${green.green7}` },
//       },
//     },
//   },
//
//   defaultVariants: {
//     variant: 'violet',
//   },
// });
//
// const IconButton = styled('button', {
//   all: 'unset',
//   fontFamily: 'inherit',
//   borderRadius: '100%',
//   height: 25,
//   width: 25,
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   color: violet.violet11,
//   position: 'absolute',
//   top: 10,
//   right: 10,
//
//   '&:hover': { backgroundColor: violet.violet4 },
//   '&:focus': { boxShadow: `0 0 0 2px ${violet.violet7}` },
// });
//
// const Fieldset = styled('fieldset', {
//   all: 'unset',
//   display: 'flex',
//   gap: 20,
//   alignItems: 'center',
//   marginBottom: 15,
// });
//
// const Label = styled('label', {
//   fontSize: 15,
//   color: violet.violet11,
//   width: 90,
//   textAlign: 'right',
// });
//
// const Input = styled('input', {
//   all: 'unset',
//   width: '100%',
//   flex: '1',
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: 4,
//   padding: '0 10px',
//   fontSize: 15,
//   lineHeight: 1,
//   color: violet.violet11,
//   boxShadow: `0 0 0 1px ${violet.violet7}`,
//   height: 35,
//
//   '&:focus': { boxShadow: `0 0 0 2px ${violet.violet8}` },
// });
//
// const DialogDemo = () => (
//   <Dialog>
//     <DialogTrigger asChild>
//       <Button size="large">Edit profile</Button>
//     </DialogTrigger>
//     <DialogContent >
//       <DialogTitle>Edit profile</DialogTitle>
//       <DialogDescription>
//         Make changes to your profile here. Click save when you're done.
//       </DialogDescription>
//       <Fieldset>
//         <Label htmlFor="name">Name</Label>
//         <Input id="name" defaultValue="Pedro Duarte" />
//       </Fieldset>
//       <Fieldset>
//         <Label htmlFor="username">Username</Label>
//         <Input id="username" defaultValue="@peduarte" />
//       </Fieldset>
//       <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
//         <DialogClose asChild>
//           <Button aria-label="Close" variant="green">
//             Save changes
//           </Button>
//         </DialogClose>
//       </Flex>
//       <DialogClose asChild>
//         <IconButton>
//           <Cross2Icon />
//         </IconButton>
//       </DialogClose>
//     </DialogContent>
//   </Dialog>
// );








// import React from 'react';
// import { styled, keyframes } from '@stitches/react';
// import { violet, mauve, blackA } from '@radix-ui/colors';
// import {
//   HamburgerMenuIcon,
//   DotFilledIcon,
//   CheckIcon,
//   ChevronRightIcon,
// } from '@radix-ui/react-icons';
// import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
//
// const slideUpAndFade = keyframes({
//   '0%': { opacity: 0, transform: 'translateY(2px)' },
//   '100%': { opacity: 1, transform: 'translateY(0)' },
// });
//
// const slideRightAndFade = keyframes({
//   '0%': { opacity: 0, transform: 'translateX(-2px)' },
//   '100%': { opacity: 1, transform: 'translateX(0)' },
// });
//
// const slideDownAndFade = keyframes({
//   '0%': { opacity: 0, transform: 'translateY(-2px)' },
//   '100%': { opacity: 1, transform: 'translateY(0)' },
// });
//
// const slideLeftAndFade = keyframes({
//   '0%': { opacity: 0, transform: 'translateX(2px)' },
//   '100%': { opacity: 1, transform: 'translateX(0)' },
// });
//
// const StyledContent = styled(DropdownMenuPrimitive.Content, {
//   minWidth: 220,
//   backgroundColor: 'white',
//   borderRadius: 6,
//   padding: 5,
//   boxShadow:
//     '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
//   '@media (prefers-reduced-motion: no-preference)': {
//     animationDuration: '400ms',
//     animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
//     animationFillMode: 'forwards',
//     willChange: 'transform, opacity',
//     '&[data-state="open"]': {
//       '&[data-side="top"]': { animationName: slideDownAndFade },
//       '&[data-side="right"]': { animationName: slideLeftAndFade },
//       '&[data-side="bottom"]': { animationName: slideUpAndFade },
//       '&[data-side="left"]': { animationName: slideRightAndFade },
//     },
//   },
// });
//
// const itemStyles = {
//   all: 'unset',
//   fontSize: 13,
//   lineHeight: 1,
//   color: violet.violet11,
//   borderRadius: 3,
//   display: 'flex',
//   alignItems: 'center',
//   height: 25,
//   padding: '0 5px',
//   position: 'relative',
//   paddingLeft: 25,
//   userSelect: 'none',
//
//   '&[data-disabled]': {
//     color: mauve.mauve8,
//     pointerEvents: 'none',
//   },
//
//   '&:focus': {
//     backgroundColor: violet.violet9,
//     color: violet.violet1,
//   },
// };
//
// const StyledItem = styled(DropdownMenuPrimitive.Item, { ...itemStyles });
// const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, { ...itemStyles });
// const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem, { ...itemStyles });
// const StyledTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
//   '&[data-state="open"]': {
//     backgroundColor: violet.violet4,
//     color: violet.violet11,
//   },
//   ...itemStyles,
// });
//
// const StyledLabel = styled(DropdownMenuPrimitive.Label, {
//   paddingLeft: 25,
//   fontSize: 12,
//   lineHeight: '25px',
//   color: mauve.mauve11,
// });
//
// const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
//   height: 1,
//   backgroundColor: violet.violet6,
//   margin: 5,
// });
//
// const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
//   position: 'absolute',
//   left: 0,
//   width: 25,
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// });
//
// const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
//   fill: 'white',
// });
//
// // Exports
// export const DropdownMenu = DropdownMenuPrimitive.Root;
// export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
// export const DropdownMenuContent = StyledContent;
// export const DropdownMenuItem = StyledItem;
// export const DropdownMenuCheckboxItem = StyledCheckboxItem;
// export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
// export const DropdownMenuRadioItem = StyledRadioItem;
// export const DropdownMenuItemIndicator = StyledItemIndicator;
// export const DropdownMenuTriggerItem = StyledTriggerItem;
// export const DropdownMenuLabel = StyledLabel;
// export const DropdownMenuSeparator = StyledSeparator;
// export const DropdownMenuArrow = StyledArrow;
//
// // Your app...
// const Box = styled('div', {});
//
// const RightSlot = styled('div', {
//   marginLeft: 'auto',
//   paddingLeft: 20,
//   color: mauve.mauve11,
//   ':focus > &': { color: 'white' },
//   '[data-disabled] &': { color: mauve.mauve8 },
// });
//
// const IconButton = styled('button', {
//   all: 'unset',
//   fontFamily: 'inherit',
//   borderRadius: '100%',
//   height: 35,
//   width: 35,
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   color: violet.violet11,
//   backgroundColor: 'white',
//   boxShadow: `0 2px 10px ${blackA.blackA7}`,
//   '&:hover': { backgroundColor: violet.violet3 },
//   '&:focus': { boxShadow: `0 0 0 2px black` },
// });
//
// export const DropdownMenuDemo = () => {
//   const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
//   const [urlsChecked, setUrlsChecked] = React.useState(false);
//   const [person, setPerson] = React.useState('pedro');
//
//   return (
//     <Box>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <IconButton aria-label="Customise options">
//             <HamburgerMenuIcon />
//           </IconButton>
//         </DropdownMenuTrigger>
//
//         <DropdownMenuContent sideOffset={5}>
//           <DropdownMenuItem>
//             New Tab <RightSlot>⌘+T</RightSlot>
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             New Window <RightSlot>⌘+N</RightSlot>
//           </DropdownMenuItem>
//           <DropdownMenuItem disabled>
//             New Private Window <RightSlot>⇧+⌘+N</RightSlot>
//           </DropdownMenuItem>
//           <DropdownMenu>
//             <DropdownMenuTriggerItem>
//               More Tools
//               <RightSlot>
//                 <ChevronRightIcon />
//               </RightSlot>
//             </DropdownMenuTriggerItem>
//             <DropdownMenuContent sideOffset={2} alignOffset={-5}>
//               <DropdownMenuItem>
//                 Save Page As… <RightSlot>⌘+S</RightSlot>
//               </DropdownMenuItem>
//               <DropdownMenuItem>Create Shortcut…</DropdownMenuItem>
//               <DropdownMenuItem>Name Window…</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Developer Tools</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <DropdownMenuSeparator />
//           <DropdownMenuCheckboxItem
//             checked={bookmarksChecked}
//             onCheckedChange={setBookmarksChecked}
//           >
//             <DropdownMenuItemIndicator>
//               <CheckIcon />
//             </DropdownMenuItemIndicator>
//             Show Bookmarks <RightSlot>⌘+B</RightSlot>
//           </DropdownMenuCheckboxItem>
//           <DropdownMenuCheckboxItem checked={urlsChecked} onCheckedChange={setUrlsChecked}>
//             <DropdownMenuItemIndicator>
//               <CheckIcon />
//             </DropdownMenuItemIndicator>
//             Show Full URLs
//           </DropdownMenuCheckboxItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuLabel>People</DropdownMenuLabel>
//           <DropdownMenuRadioGroup value={person} onValueChange={setPerson}>
//             <DropdownMenuRadioItem value="pedro">
//               <DropdownMenuItemIndicator>
//                 <DotFilledIcon />
//               </DropdownMenuItemIndicator>
//               Pedro Duarte
//             </DropdownMenuRadioItem>
//             <DropdownMenuRadioItem value="colm">
//               <DropdownMenuItemIndicator>
//                 <DotFilledIcon />
//               </DropdownMenuItemIndicator>
//               Colm Tuite
//             </DropdownMenuRadioItem>
//           </DropdownMenuRadioGroup>
//           <DropdownMenuArrow />
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </Box>
//   );
// };
//
// export default DropdownMenuDemo;







const DialogDemo = () => {
  return <div></div>
}

export default DialogDemo;
