import { Component ,OnInit,NgZone} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { FormGroup,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit{
  getId:any;
  updateFrom:FormGroup;

  constructor(
    public formBuilder:FormBuilder,
    private router: Router,
    private ngZone :NgZone,
    private activatedRoute:ActivatedRoute,
    private crudService:CrudService,
  ){
    this.getId = this.activatedRoute.snapshot.paramMap.get('id')
    this.crudService.GetBook(this.getId).subscribe(res =>{
      this.updateFrom.setValue({
        name: res['name'],
        price: res['price'],
        description: res['description'],
      })
    })
    this.updateFrom = this.formBuilder.group({
      name: [''],
      price: [''],
      description: [''],
    })
  }

  
  ngOnInit(): void {
    
  }

  onUpdate():any {
    this.crudService.UpdateBook(this.getId,this.updateFrom.value).subscribe(res=>{
      console.log("Data update success");
      this.ngZone.run(()=> this.router.navigateByUrl('/books-list'))
      
    },err=>{
      console.log(err);
      
    })
  }

}
