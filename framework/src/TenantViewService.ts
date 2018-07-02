
import AssemblyView from 'api/AssemblyView';
import AssemblyStep from 'api/AssemblyStep';

export type LazyView = (step: AssemblyStep<any>) => AssemblyView<any>;

export default interface TenantViewService {
  getByIndex(index: number): LazyView|undefined
}