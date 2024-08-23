class Task {
    constructor(id, title, status, texts) {
        this.id = id;
        this.title = title;
        this.status = status; // "To do", "Doing", "Done"
        this.texts = texts; // [{text: '...', done: false}]
    }
}

export default Task;
