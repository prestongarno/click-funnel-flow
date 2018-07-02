
import Product from "./Product";


export default interface AssemblyView<T extends Product> {


  onStart(product: T): Promise<any>

  onRestore(product: T): Promise<any>

  onComplete(): Promise<any>

  onProductUpdated(product: T): Promise<any>

  destroy(): Promise<any>

}