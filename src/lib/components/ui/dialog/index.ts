import { Dialog as DialogPrimitive } from "bits-ui";

import Title from "./dialog-title.svelte";
<<<<<<< HEAD
import Portal from "./dialog-portal.svelte";
=======
>>>>>>> 18ac060678c5dcec50bcfbcb5c0ec1533fe4ff06
import Footer from "./dialog-footer.svelte";
import Header from "./dialog-header.svelte";
import Overlay from "./dialog-overlay.svelte";
import Content from "./dialog-content.svelte";
import Description from "./dialog-description.svelte";

const Root = DialogPrimitive.Root;
const Trigger = DialogPrimitive.Trigger;
const Close = DialogPrimitive.Close;
<<<<<<< HEAD
=======
const Portal = DialogPrimitive.Portal;
>>>>>>> 18ac060678c5dcec50bcfbcb5c0ec1533fe4ff06

export {
	Root,
	Title,
	Portal,
	Footer,
	Header,
	Trigger,
	Overlay,
	Content,
	Description,
	Close,
	//
	Root as Dialog,
	Title as DialogTitle,
	Portal as DialogPortal,
	Footer as DialogFooter,
	Header as DialogHeader,
	Trigger as DialogTrigger,
	Overlay as DialogOverlay,
	Content as DialogContent,
	Description as DialogDescription,
	Close as DialogClose,
};
