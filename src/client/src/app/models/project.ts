export class Project {
    private __id: string
    private _name: string
    private _ownerID: string
    private _budget: number
    private _startDate: Date
    private _endDate: Date
    private _expectedEarnings: number
    private _finalEarnings: number | null | undefined

    public constructor(
        _id: string,
        name: string,
        ownerID: string,
        budget: number,
        startDate: Date,
        endDate: Date,
        expectedEarnings: number,
        finalEarnings?: number | null | undefined
    ) {
        this.__id = _id
        this._name = name
        this._ownerID = ownerID
        this._budget = budget
        this._startDate = startDate
        this._endDate = endDate
        this._expectedEarnings = expectedEarnings
        this._finalEarnings = finalEarnings
    }

    get _id() {
        return this.__id
    }

    get name() {
        return this._name
    }

    get ownerID() {
        return this._ownerID
    }

    get budget() {
        return this._budget
    }

    get startDate() {
        return this._startDate
    }

    get endDate() {
        return this._endDate
    }

    get expectedEarnings() {
        return this._expectedEarnings
    }

    get finalEarnings() {
        return this._finalEarnings
    }

}