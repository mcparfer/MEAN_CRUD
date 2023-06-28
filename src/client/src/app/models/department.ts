type Contact = {
    number: string
    type: string
}

export class Department {
    private __id: string
    private _name: string
    private _contactInfo: Contact[]
    private _shifts: string[]

    public constructor(
        _id: string,
        name: string,
        contactInfo: Contact[],
        shifts: string[]
    ) {
        this.__id = _id
        this._name = name
        this._contactInfo = contactInfo
        this._shifts = shifts
    }

    get _id() {
        return this.__id
    }

    get name() {
        return this._name
    }

    get contactInfo() {
        return this._contactInfo
    }

    get shifts() {
        return this._shifts
    }

}