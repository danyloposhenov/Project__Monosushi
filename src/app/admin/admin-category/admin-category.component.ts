import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ICategoryRequest, ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent {

  public list = true;

  public categoryForm!: FormGroup;
  public adminCategories: Array<ICategoryResponse> = [];
  public editStatus = false;
  public currentID = 0;
  public isUploaded = false;
  public uploadPercent = 0;

  constructor (
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.loadCategory();
    this.initCategoryForm();
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      id: null,
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: null,
    })
  }

  loadCategory(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data
    })
  }

  addCategory(): void{
    if (this.editStatus) {
      this.categoryService.updateCategory(this.categoryForm.value, this.currentID).subscribe(() => {
        this.loadCategory();
      })
    } else {
      this.categoryService.createCategory(this.categoryForm.value).subscribe(() => {
        this.loadCategory();
      })
    }
    this.list = true;
    this.editStatus = false;
    this.currentID = 0;
    this.categoryForm.reset();
  }

  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      date: category.id,
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    })
    this.list = false;
    this.editStatus = true;
    this.currentID = category.id;
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.deleteCategory(category.id).subscribe(() => {
      this.loadCategory();
    })
  }

  upload(e: any): void {
    const file = e.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        })
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress;
        })
        await task;
        url = await getDownloadURL(storageRef);
      } catch (err: any) {
        console.error(err);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(()=> {
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.categoryForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value
  }

  openList(): void {
    if (this.list) {
      this.list = false;
    } else {
      this.list = true
    }
  }
}
