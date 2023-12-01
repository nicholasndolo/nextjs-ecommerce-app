import { productById } from "@/services/product"


export default async function ProductDetails({params}) {

  const productDetailsData = await productById(params.details)

  // console.log(productDetailsData)
  return (
    <div>
      Details
    </div>
  )
}