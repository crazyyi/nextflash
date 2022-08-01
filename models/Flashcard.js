class Flashcard {
    constructor(props) {
        this._uuid = props._uuid
        this._id = props._id
        this._front = props.front
        this._back = props.back
        this._visited = props.visited
        this._createdOn = props.createdOn
        this._lastVisited = props.lastVisited
        this._tags = props.tags
    }

    get uuid() {
        return this._uuid
    }

    get id() {
        return this._id
    }

    get front() {
        return this._front
    }

    get back() {
        return this._back
    }

    get visited() {
        return this._visited
    }

    get createdOn() {
        return this._createdOn
    }

    get lastVisited() {
        return this._lastVisited
    }

    get tags() {
        return this._tags
    }

}