import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

import { RecipeService } from '../shared/recipe.service'
import { Recipe } from '../shared/recipe.model';
import { ToastrService } from 'ngx-toastr';  



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  IsLeftHide = true ;
  IsRightHide = false;
  

  constructor(private recService: RecipeService,private toastr : ToastrService, private router : Router) {   
  }

  ngOnInit() {    
    this.recService.getRecipe();    
  }

  showForEdit(rec: Recipe) {
    this.recService.selectedRecipe = Object.assign({}, rec);;
  }  

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.recService.deleteRecipe(id)
      .subscribe(x => {
        this.recService.getRecipe();
        this.toastr.warning("Deleted Successfully","Recipe Register");
      })
    }
  }

  moveon(rec: Recipe){        
    this.router.navigate(['addrecipe', rec.RecipeId, rec.Specialty, rec.Recipe_Parent, rec.Recipe])
    //this.router.navigate(['createrecipe', rec.RecipeId, rec.Specialty, rec.Recipe_Parent, rec.Recipe])
 }
}
