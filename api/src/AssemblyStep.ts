import {Result} from "api/Common";


/**
 * Step for configuring a product
 */
interface AssemblyStep<Product> {

  id: string

  updateProduct(transformation: (product: Product) => void): Promise<Result>


  complete(step: AssemblyStep<any>): Promise<Result>
}

export default AssemblyStep;
