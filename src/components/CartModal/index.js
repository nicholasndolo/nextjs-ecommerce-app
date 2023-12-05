import { Fragment, useContext } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";


export default function CartModal() {

  const { showCartModal, setShowCartModal} = useContext(GlobalContext)
  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
       setShow={setShowCartModal}
      buttonComponent={
        <Fragment>
          <button>Go To Cart</button>
          <button>Checkout</button>

        </Fragment>
      }
    />
  )
}