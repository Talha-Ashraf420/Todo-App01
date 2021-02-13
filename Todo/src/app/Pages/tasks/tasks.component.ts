import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit,faPlus,faCheck,faPlusSquare,faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  showSpinner=true
  selectedId:any
  category:any;
  categoryData:any
  validate=false
  filteredCategory:any=[]
  taskData:any
  faEdit=faEdit
  faPlus=faPlus
  faPlusSquare=faPlusSquare
  faGraduationCap=faGraduationCap
  faCheck=faCheck
  taskForm:FormGroup
  successNote=false
  showForm=true;
  constructor(private categoryService:CategoriesService,
    private router:Router,private route:ActivatedRoute,private fb:FormBuilder) {
    this.taskForm=this.fb.group({
      taskName:['',Validators.required],
      categoryName:['',Validators.required]
    })
   }

   get f(){
    return this.taskForm.controls
  }

  public onOptionsSelected(event:any) {
  this.selectedId = event.target.value;
 }
   submitForm(){
    this.validate=true;
    if(this.taskForm.invalid){
      return
    }
    const data={
      tasks:this.taskForm.controls['taskName'].value
    }
    this.categoryService.addTask(this.selectedId,data).subscribe(res=>{
      if(res){
        this.validate=false
        this.successNote=true
        this.showForm=false
        this.populateTasks()
        this.taskForm.reset()
      }
    })
  }
   hideMessage(){
    this.successNote=false;
    this.showForm=true
  }
  populateTasks() { 
    this.categoryService
      .getCategories()
      .pipe(
        switchMap(res => {
          this.taskData=res
          this.showSpinner=false
          console.log(this.taskData)
        return this.route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('filter');
        this.applyFilter();      
      })
      ;
  }
  getCategories(){
    this.categoryService.getCategories().subscribe(res=>{
      if(res){
        this.categoryData=res
      }
    })
  }
  private applyFilter() { 
    this.filteredCategory = (this.category) ? 
    this.taskData.filter((p:any) => p?.category?.categoryName === this.category) : 
    this.taskData;
    console.log(this.filteredCategory)
  }
  ngOnInit(): void {
    this.getCategories()
    this.populateTasks()
  }

}
