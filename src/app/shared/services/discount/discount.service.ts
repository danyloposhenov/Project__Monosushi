import { Injectable } from '@angular/core';
import { IDiscountRequest } from '../../interfaces/discount/discount.interface';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private discountCollection!: CollectionReference<DocumentData>;

  constructor ( private afs: Firestore ) {
    this.discountCollection = collection(this.afs, 'discounts')
  }

  getAllFirebase() {
    return collectionData(this.discountCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `discounts/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  createFirebase(discount: IDiscountRequest) {
    return addDoc(this.discountCollection, discount);
  }

  updateFirebase(discount: IDiscountRequest, id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return updateDoc(discountDocumentReference, {...discount});
  }

  deleteFirebase(id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return deleteDoc(discountDocumentReference);
  }

}
