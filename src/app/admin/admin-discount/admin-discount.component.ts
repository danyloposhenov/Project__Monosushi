import { Component, OnInit } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountRequest, IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent {
  public list = true;

  public adminDiscounts: Array<IDiscountResponse> = [];
  public discountForm!: FormGroup;
  public editStatus = false;
  private currentID = 0;
  public isUploaded = false;
  public uploadPercent = 0;

  constructor(
    private fb: FormBuilder,
    private discountService: DiscountService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.loadDiscounts();
    this.initDiscountForm();
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      date: new Date(),
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: null
    })
  }

  loadDiscounts(): void {
    this.discountService.getAll().subscribe(data => {
      this.adminDiscounts = data;
    })
  }

  addDiscount(): void {
    if (this.editStatus) {
      this.discountService.update(this.discountForm.value, this.currentID).subscribe(() => {
        this.loadDiscounts();
      })
    } else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        this.loadDiscounts();
      })
    }
    this.list = true;
    this.editStatus = false;
    this.discountForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editDiscount(discount: IDiscountResponse): void {
    this.discountForm.patchValue({
      date: discount.date,
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath
    });
    this.list = false;
    this.editStatus = true;
    this.currentID = discount.id;
    this.isUploaded = true;
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.delete(discount.id).subscribe(() => {
      this.loadDiscounts();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
          imagePath: data
        });
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
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url)
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.discountForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value
  }

  openList(): void {
    if (this.list) {
      this.list = false;
    } else {
      this.list = true
    }
  }

}
