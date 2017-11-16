import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { MycComponent } from './myc.component';
import { TestComponent } from './test.component';
import { TsxComponent } from './tsx.component';

@NgModule({
  declarations: [
    AppComponent,
    MycComponent,
    TestComponent,
    TsxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,MycComponent]
})
export class AppModule { }
