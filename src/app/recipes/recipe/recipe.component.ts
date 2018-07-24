import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { RecipeService } from '../shared/recipe.service'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(private recService: RecipeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.recService.selectedRecipe = {
      RecipeId : null,
      Specialty : '',
      Recipe_Parent : '',
      Recipe : '',
      Priority : '',
      PreLogicalOperator : '',
      Attribute : '',
      Condition : '',
      Codegroup : '',
      PostLogicalOperator : ''
    }
  }
 
  searchRecipe(form?: NgForm)
  {
    if(form != null)
    {     
      this.recService.getSearchRecipe(form.value);
    }
  }
 
  onSubmit(form: NgForm) {
    if (form.value.RecipeId == null) {
      this.recService.postRecipe(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.recService.getRecipe();
          this.toastr.success('New Record Added Succcessfully', 'Recipe Register');
        })
    }
    else {     
      this.recService.putRecipe(form.value.RecipeId, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.recService.getRecipe();
        this.toastr.info('Record Updated Successfully!', 'Recipe Register');
      });
    }
  }
}
