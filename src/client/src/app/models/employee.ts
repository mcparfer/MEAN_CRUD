export class Employee {
  private __id: string
  private _firstName: string
  private _lastName: string
  private _email: string
  private _departmentID: number
  private _hireDate: Date
  private _supervisor: boolean
  private _manager: boolean
  private _salary: number

  // El campo _id y _salary son campos privados que solo aparecerán en la base de datos.
  public constructor(
    firstName: string,
    lastName: string,
    email: string,
    departmentID: number,
    hireDate: Date,
    supervisor: boolean,
    manager: boolean
  ) {
    this.__id = this._id
    this._firstName = firstName,
      this._lastName = lastName,
      this._email = email,
      this._departmentID = departmentID,
      this._hireDate = hireDate,
      this._supervisor = supervisor,
      this._manager = manager,
      this._salary = this.salary
  }

  // Generador de ID aleatorio.
  get _id() {
    var autoID = "id" + Math.random().toString(16).slice(2).slice(0, 5)
    return this.__id = autoID
  }
  get firstName() {
    return this._firstName
  }
  get lastName() {
    return this._lastName
  }
  get email() {
    return this._email
  }
  get hireDate() {
    return this._hireDate
  }
  get departmentID() {
    return this._departmentID
  }
  get supervisor() {
    return this._supervisor
  }
  get manager() {
    return this._manager
  }
  // El salario aumenta a mayores roles y mayor antigüedad del empleado.
  get salary() {
    let basicSalary: number = 1000;
    var time: number = (new Date().getTime() - new Date(this._hireDate).getTime()) / (1000 * 60 * 60 * 24 * 365)

    if (this._manager == true) {
      basicSalary += basicSalary * 0.20
    }
    if (this._supervisor == true) {
      basicSalary += basicSalary * 0.20
    }
    for (let i = 1; i < time; i++) {
      basicSalary += 20;
    }
    return this._salary = basicSalary
  }
}