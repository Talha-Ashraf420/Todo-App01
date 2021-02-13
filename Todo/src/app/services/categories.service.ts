import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url = 'http://localhost:8080';
  constructor(private http:HttpClient) { }
  getCategories(){
    return this.http.get(`${this.url}/category/get-categories`)
  }
  addCategory(data:any){
    return this.http.post(`${this.url}/category/add-category`,data)
  }
  addTask(id:any,data:any){
    return this.http.put(`${this.url}/category/get-tasks/edit/${id}`,data)
  }
 
}
