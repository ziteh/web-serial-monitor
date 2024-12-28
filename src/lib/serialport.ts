const RX_BUFFER_SIZE = 1024;

export class SerialPort {
  private constructor() {}

  private static instance: SerialPort;

  public static getInstance(): SerialPort {
    if (!SerialPort.instance) {
      SerialPort.instance = new SerialPort();
    }
    return SerialPort.instance;
  }

  public static get isAvailable(): boolean {
    return "serial" in navigator;
  }

  private port;
  private reader;
  private writer;

  public readonly rxBuffer: Uint8Array = new Uint8Array(RX_BUFFER_SIZE);

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

  private async callback(value: Uint8Array) {}

  private async handleReadStream() {
    try {
      while (this.port.readable) {
        const { value, done } = await this.reader.read();
        if (done) {
          break;
        }

        console.log("rx:", value);
        this.rxBuffer.set(value, 0);
        this.callback(value);
      }
    } catch (err) {
      console.error(err);
    }

    this.reader.releaseLock();
    this.writer.releaseLock();
    await this.port.close();
  }
}
