import {Result} from "api/Common";
import Product from "api/Product";
import AssemblyStep from "api/AssemblyStep";
import AssemblyView from "api/AssemblyView";
import {ProductAssembler} from "framework/ProductAssembler"

type ViewConstructor<T extends Product> =
    (step: AssemblyStep<T>) => AssemblyView<T>

class AssemblySpec<T extends Product> {


  private readonly assemblySpecification: Array<StepSpec<T>> = [];
  private readonly productSpec: ProductSpec<T>;


  private constructor(productSpec: ProductSpec<T>) {
    this.productSpec = productSpec;
  }

  public addProductionStep(step: StepSpec<T>): AssemblySpec<T> {
    this.assemblySpecification.push(step);
    return this;
  }

  build(): ProductAssembler

  static builder<T extends Product>(productSpec: ProductSpec<T>): AssemblySpec<T> {
    return new AssemblySpec(productSpec);
  }
}

type ProductSpec<T extends Product> = (product: T) => Result


class StepSpec<T extends Product> {

  static Builder = class <T extends Product> {
    readonly _onCreateView: ViewConstructor<T>;
    _canEnter = (p: T) => true;
    _canComplete = (p: T) => true;
    constructor(onCreateView: ViewConstructor<T>) { this._onCreateView = onCreateView; }
    validateEnterStep(check: (product: T) => boolean) { this._canEnter = check; return this; }
    validateCanCompleteStep(check: (product: T) => boolean) { this._canComplete = check; return this; }
    build() {
      return new StepSpec(this);
    }
  };


  readonly viewConstructor: ViewConstructor<T>;
  readonly canEnter: (product: T) => Result;
  readonly canComplete: (product: T) => Result;

  private constructor(builder: StepSpec.Builder<T>) {
    this.viewConstructor = builder._onCreateView;
    this.canEnter = builder._canEnter;
    this.canComplete = builder._canComplete;
    Object.freeze(this);
  }
}

class Foo implements Product {
  getId(): string { return "1234"; }
  hashcode(): string { return this.getId(); }
}

function foo() {

  const fooSpec = new StepSpec.Builder<Foo>(() => undefined)
      .validateCanCompleteStep(product => product.getId() === "1234")
      .validateEnterStep(product => product.hashcode() !== product.getId())
      .build()

  AssemblySpec.builder(it => true)
      .addProductionStep(fooSpec)
      .addProductionStep(fooSpec)
      .addProductionStep(fooSpec)
}


