import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule, FormGroup }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterModule } from './pages/register/register.module';
import { AppRoutingModule } from './app-routing.module';
import { VisualizeModule } from './pages/visualize/visualize.module';
import { SelectUnityComponent } from './components/select-unity/select-unity.component';


const appRoutes: Routes = [
    {
      path: '',
      component: HomePageComponent
    }
];

@NgModule({
  declarations: [
    AppComponent, 
    HomePageComponent, 
  ],
  imports: [
    RegisterModule, 
    VisualizeModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
