import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators';
import { Observable ,throwError} from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

export class Book{
  _id!:String;
  name!:String;
  price!:String;
  description!:String;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  //
  REST_API: string = "http://localhost:8000/api"

  httpHeader = new HttpHeaders().set('Content-Type','application/json')
  constructor(private httpClient: HttpClient) { }

    //Add
  AddBook(data:Book) : Observable<any>{
    let API_URL = `${this.REST_API}/add-book`
    return this.httpClient.post(API_URL,data).pipe(
      catchError(this.handleError)
    )
  }

  GetBooks() {
    let API_URL = `${this.REST_API}`
    return this.httpClient.get(API_URL)
  }

  GetBook(id:any) : Observable<any>{
    let API_URL = `${this.REST_API}/read-book/${id}`
    return this.httpClient.get(API_URL,{headers:this.httpHeader})
    .pipe(map((res:any)=>{
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  DeleteBook(id:any) : Observable<any>{
    let API_URL = `${this.REST_API}/delete-book/${id}`
    return this.httpClient.delete(API_URL,{headers:this.httpHeader})
    .pipe(
      catchError(this.handleError)
    )
  }

  UpdateBook(id:any,data:any) : Observable<any>{
    let API_URL = `${this.REST_API}/update-book/${id}`
    return this.httpClient.put(API_URL,data,{headers:this.httpHeader})
    .pipe(
      catchError(this.handleError)
    )
  }


  handleError(error:HttpErrorResponse){
    let errorMessage = ''
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message
    }else{
      errorMessage = `Error Code ${error.status} \nMessage: ${error.message}`
    }
    return throwError(errorMessage)
  }
  
}
