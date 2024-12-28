const RX_BUFFER_SIZE = 1024;
const RX_TIMEOUT = 10;

type rxCallback = (data: Uint8Array) => void;

export class SerialPort {
  private observers: rxCallback[] = [];

  public registerObserver(observer: rxCallback): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: rxCallback): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  private notifyObservers(message: Uint8Array): void {
    this.observers.forEach((cb) => cb(message));
  }

  private constructor() {}

  private static instance: SerialPort;

  public static getInstance(): SerialPort {
    if (!SerialPort.instance) {
      SerialPort.instance = new SerialPort();
    }
    return SerialPort.instance;
  }

  public static get isSupported(): boolean {
    return "serial" in navigator;
  }

  private port;
  private reader: ReadableStreamDefaultReader | null = null;
  private writer: WritableStreamDefaultWriter | null = null;

  public async open(
    baudRate: number,
    dataBits: number,
    parity: string,
    stopBits: number,
  ) {
    this.port = await navigator.serial.requestPort();
    await this.port.open({
      baudRate,
      dataBits,
      parity,
      stopBits,
      flowControl: "none",
      bufferSize: 255,
    });

    this.reader = this.port.readable.getReader();
    this.writer = this.port.writable.getWriter();

    this.handleReadStream();
  }

  public async close() {
    if (!this.reader) {
      throw new Error("Serial port is not open.");
    }

    this.reader.cancel();
  }

  public async write(data: Uint8Array | string) {
    if (!this.writer) {
      throw new Error("Serial port is not open.");
    }

    if (typeof data === "string") {
      data = new TextEncoder().encode(data);
    }
    await this.writer.write(data);
  }

  private async handleReadStream() {
    if (!this.reader || !this.writer) {
      throw new Error("Serial port is not open.");
    }

    const buffer = new Uint8Array(RX_BUFFER_SIZE);
    let timer;
    let count = 0;

    try {
      while (this.port.readable) {
        const { value, done } = await this.reader.read();
        if (done) {
          break;
        }

        if (timer && count > 0) {
          clearTimeout(timer);
        }

        timer = setTimeout(() => {
          const msg = buffer.slice(0, count);
          this.notifyObservers(msg);
          count = 0;
        }, RX_TIMEOUT);

        buffer.set(value, count);
        count += value.length;
      }
    } catch (err) {
      console.error(err);
    }

    clearTimeout(timer);
    this.reader.releaseLock();
    this.writer.releaseLock();
    await this.port.close();
  }
}
