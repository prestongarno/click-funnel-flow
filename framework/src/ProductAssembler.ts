import AssemblyLine from "./AssemblyLine";
import InternalAssemblyStep from "./InternalAssemblyStep";
import AssemblyView from "api/AssemblyView";
import TenantViewService from "./TenantViewService";
import MutableProduct from "./MutableProduct";


type CachedStep = {
  step: InternalAssemblyStep
  view: AssemblyView<any>
}

// presenter
class ProductAssembler {

  private readonly assemblyLine: AssemblyLine;
  private readonly viewService: TenantViewService;
  private readonly product: MutableProduct;

  private readonly steps: {
    currentView: AssemblyView<any>|undefined
    byId: Map<string, CachedStep>
    byIndex: Map<number, CachedStep>
  };


  constructor(
      assemblyLine: AssemblyLine,
      viewService: TenantViewService,
      product: MutableProduct) {

    this.assemblyLine = assemblyLine;
    this.viewService = viewService;
    this.product = product;

    this.steps = {
      currentView: undefined,
      byId: new Map(),
      byIndex: new Map()
    }
  }

  async goToStep(index: number) {

    if (this._tryCache(index)) {
      return this._restoreView(this._tryCache(index).view)
    }
    if (!this.assemblyLine[index]) {
      throw new Error(`No such assembly step at index ${index}`);
    }


    // Contact the view service and ask for the constructor of the view
    const viewConstructor = this.viewService.getByIndex(index);
    if (!viewConstructor) {
      throw new Error(`No such view for requested assembly step ${index}!`)
    }


    // try to setup, show, and cache the view
    try {
      const view: AssemblyView<any> =
          viewConstructor(this.assemblyLine[index]);
      this.steps.byIndex.set(index, {
        step: this.assemblyLine.steps[index],
        view: view
      });
      this.steps.currentView = view;
      return view.onStart(this.product);

    } catch (ex) {
      console.error(`Failed to navigate to step ${ex}`);
      throw new Error(ex)
    }
  }

  private async _restoreView(view: AssemblyView<any>) {
    await this.steps.currentView
        ? this.steps.currentView.onComplete()
        : Promise.resolve(undefined);
    return view.onRestore(this.product)
  }

  private _tryCache(index: number): CachedStep|undefined {
    return this.steps.byIndex.get(index);
  }
}