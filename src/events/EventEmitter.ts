import EventEmitter from "eventemitter3";
import Event from "./Event";

const eventEmitter = new EventEmitter();

const Emitter = {
    on: (event: Event, fn: any) => eventEmitter.on(event.toString(), fn),
    once: (event: Event, fn: any) => eventEmitter.once(event.toString(), fn),
    off: (event: Event, fn: any) => eventEmitter.off(event.toString(), fn),
    emit: (event: Event, payload: any) =>
        eventEmitter.emit(event.toString(), payload),
};

Object.freeze(Emitter);

export default Emitter;
