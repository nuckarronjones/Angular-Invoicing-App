import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { InvoiceEditorPageComponent } from './app/pages/invoice-editor-page/invoice-editor-page.component';
import { UserInvoicesPageComponent } from './app/pages/user-invoices-page/user-invoices-page.component';

bootstrapApplication(AppComponent, {
  ...appConfig,  // Spread existing config
  providers: [
    ...appConfig.providers, 
    provideAnimations(),
    provideRouter([
      { path: 'invoices', component: InvoiceEditorPageComponent },
      { path: 'invoice/:id', component: InvoiceEditorPageComponent },
      { path: '', component: UserInvoicesPageComponent },
      { path: '**', redirectTo: '' } 
    ])       
  ]
})
  .catch((err) => console.error(err));
