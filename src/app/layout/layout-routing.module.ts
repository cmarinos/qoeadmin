import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
            {path: 'charts', loadChildren: './charts/charts.module#ChartsModule'},
            {path: 'tables', loadChildren: './tables/tables.module#TablesModule'},
            {path: 'form', loadChildren: './dxp-form/dxp-form.module#DxpFormModule'},
            {path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule'},
            {path: 'grid', loadChildren: './grid/grid.module#GridModule'},
            {path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule'},
            {path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule'},
            {path: 'workflow', loadChildren: './workflow/workflow.module#WorkflowModule'},
            {path: 'catalog', loadChildren: '../product-catalog/product-catalog.module#ProductCatalogModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
