export default class MenuItems {
    constructor(props) {
        this._id = props.id
        this._displayTexts = props.displayTexts
    }

    get id() {
        return this._id
    }

    get displayTexts() {
        return this._displayTexts
    }
}