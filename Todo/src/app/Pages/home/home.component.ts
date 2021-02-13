import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { faEdit,faPlus,faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  validate=false
  showSpinner=true
  counter=0
  faEdit=faEdit
  faPlus=faPlus
  faCheck=faCheck
  categoryData:any;
  successNote=false
  showForm=true;
  categoryForm:FormGroup
 
  constructor(private catrgoryService:CategoriesService,private fb:FormBuilder,
    private router:Router,private route:ActivatedRoute,) { 
    this.categoryForm=this.fb.group({
      categoryName:['',Validators.required]
    })
  }
 
  get f(){
    return this.categoryForm.controls
  }
  submitForm(){
    this.validate=true;
    if(this.categoryForm.invalid){
      return
    }
    const data={
      category:this.categoryForm.value
    }
    this.catrgoryService.addCategory(data).subscribe(res=>{
      if(res){
        this.validate=false
        this.successNote=true
        this.showForm=false
        this.getCategories()
        this.categoryForm.reset()
      }
    })
  }
hideMessage(){
  this.successNote=false;
  this.showForm=true
}

navigatetoTask(event:any){
  console.log(event)
  this.router.navigate(['tasks'] ,{ queryParams: { filter:event}});
}
 

  getCategories(){
    this.catrgoryService.getCategories().subscribe(res=>{
      if(res){
        this.categoryData=res
        this.showSpinner=false
      }
    })
  }
  
  ngOnInit(): void {
    this.getCategories()
  }

}
