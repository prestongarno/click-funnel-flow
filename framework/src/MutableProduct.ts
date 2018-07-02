import Product from "api/Product";
import {Result} from "api/Common";


export default interface MutableProduct extends Product {
  // TODO
}

class ProductSpec {
  private readonly isValid: (product: Product) => Result
}