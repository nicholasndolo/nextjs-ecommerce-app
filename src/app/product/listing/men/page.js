import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";




export default async function AllMenProducts(){

  const getAllProducts = await productByCategory('men')c

  return <CommonListing data={getAllProducts && getAllProducts.data}/>

}