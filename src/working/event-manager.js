class EventManager {
    handlers = {}

    on(eventName, eventHandler) {
        if (Array.isArray(this.handlers[eventName])) {
            this.handlers[eventName].push(eventHandler)
            return;
        };
        this.handlers[eventName] = [eventHandler];
    }

    off(eventName, eventHandler) {
        if (!this.handlers[eventName]) return;
        const index = this.handlers[eventName].findIndex((existingHandler) => {
            return existingHandler === eventHandler
        });
        this.handlers[eventName].splice(index, 1);
    };

    trigger(eventName) {
        if (!this.handlers[eventName]) return;
        this.handlers[eventName].forEach((handler) => {
            handler(eventName, this)
        })
    };
}


const eventManager = new EventManager();

const handlerVS1 = (name, e) => {
    console.log('event1', name, e)
}

const handlerVS2 = (name, e) => {
    console.log('event2', name, e)
}

const handlerVS3 = (name, e) => {
    console.log('event3', name, e)
}

eventManager.on('vovaScreaming', handlerVS1)
eventManager.on('vovaScreaming', handlerVS2)
eventManager.on('vovaScreaming', handlerVS3)

eventManager.trigger('vovaScreaming')

console.log('=== separator ===')

eventManager.on('vovaScreaming', handlerVS2)

eventManager.trigger('vovaScreaming')