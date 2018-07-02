import AssemblyStep from 'api/AssemblyStep';
import Product from 'api/Product';

interface InternalAssemblyStep extends AssemblyStep<Product> {
  productCanEnterStep(product: Product): boolean
  productCanProceed(product: Product): boolean
}

export default InternalAssemblyStep;