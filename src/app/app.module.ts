import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UniversalMaterialModule } from './universal-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportComponent } from './report/report.component';
import { BmrService } from './bmr.service';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    UniversalMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BmrService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
