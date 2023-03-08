import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent {

  public list = true;

  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts: Array<IProductResponse> = [];
  public productForm!: FormGroup;
  public editStatus = false;
  public currentProductID = 0;
  public isUploaded = false;
  public uploadPercent = 0;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProducts();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null],
      count: [1]
    })
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    })
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  }


  addProduct(): void {
    if (this.editStatus) {
      this.productService.update(this.productForm.value, this.currentProductID).subscribe(() => {
        this.loadProducts();
      })
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.loadProducts();
      })
    }
    this.editStatus = false;
    this.list = true;
    this.isUploaded = false;
    this.currentProductID = 0;
    this.productForm.reset();
  }

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      description: product.description,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath
    })
    this.editStatus = true;
    this.isUploaded = true;
    this.list = false;
    this.currentProductID = product.id;
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.delete(product.id).subscribe(() => {
      this.loadProducts();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        })
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({ imagePath: null })
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string) {
    return this.productForm.get(control)?.value
  }

  openList(): void {
    if (this.list) {
      this.list = false;
    } else {
      this.list = true
    }
  }
}
