import { BaseModel } from './base.model';

export class ContactModel extends BaseModel {
    public id: number;
    public name: string;
    public phoneNumber: string;

    constructor() {
        super();
    }

  public static Create(
        id: number,
        name: string,
        phoneNumber: string) {
        let model = new ContactModel();

        model.id = id;
        model.name = name;
        model.phoneNumber = phoneNumber;

        return model;
  }
}