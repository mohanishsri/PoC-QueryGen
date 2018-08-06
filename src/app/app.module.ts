import { BrowserModule } from '@angular/platform-browser'
import { NgModule, Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Router} from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {TabsModule} from 'ngx-bootstrap';
import {ModalModule} from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { CreaterecipeComponent } from './recipes/createrecipe/createrecipe.component';
import { AddattributeComponent } from './recipes/createrecipe/addattribute/addattribute.component';
import { AddrecipesComponent } from './recipes/addrecipes/addrecipes.component';
import { NewrecipeComponent } from './recipes/addrecipes/newrecipe/newrecipe.component';
import { RecipedetailsService } from './recipes/shared/recipedetails.service';
import { DislpayresultComponent } from './recipes/addrecipes/dislpayresult/dislpayresult.component';
import { DyndisplayresultComponent } from './recipes/addrecipes/dyndisplayresult/dyndisplayresult.component';
import { DisplayresultService } from './recipes/shared/displayresult.service';


@NgModule({
  declarations: [
    AppComponent,    
    RecipesComponent,
    RecipeComponent,
    RecipeListComponent,
    CreaterecipeComponent,
    AddattributeComponent,
    AddrecipesComponent,
    NewrecipeComponent,
    DislpayresultComponent,
    DyndisplayresultComponent        
  ],
  imports: [    
    BrowserModule,    
    NgxPaginationModule,    
    AngularMultiSelectModule, 
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpModule,   
    ToastrModule.forRoot(),    
    RouterModule.forRoot([      
      {path:'', component:RecipesComponent},
      { path:'createrecipe/:id/:sp/:rp/:r', component:CreaterecipeComponent },
      { path:'addrecipe/:id/:sp/:rp/:r', component:AddrecipesComponent },
      { path:'displayresult/:id/:sp/:rp/:r', component:DislpayresultComponent },
      { path:'popup', component:NewrecipeComponent },
      { path:'model', component:AddattributeComponent }
    ])       
  ],
  providers: [RecipedetailsService, DisplayresultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
