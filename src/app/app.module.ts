import { BrowserModule } from '@angular/platform-browser'
import { NgModule, Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Router} from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {ModalModule} from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { CreaterecipeComponent } from './recipes/createrecipe/createrecipe.component';
import { AddattributeComponent } from './recipes/createrecipe/addattribute/addattribute.component';


@NgModule({
  declarations: [
    AppComponent,    
    RecipesComponent,
    RecipeComponent,
    RecipeListComponent,
    CreaterecipeComponent,
    AddattributeComponent        
  ],
  imports: [    
    BrowserModule,    
    NgxPaginationModule,    
    AngularMultiSelectModule, 
    ModalModule.forRoot(),
    FormsModule,
    HttpModule,   
    ToastrModule.forRoot(),
    RouterModule.forRoot([      
      {path:'', component:RecipesComponent},
      { path:'createrecipe/:id/:sp/:rp/:r', component:CreaterecipeComponent },
      { path:'model', component:AddattributeComponent }
    ])       
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
