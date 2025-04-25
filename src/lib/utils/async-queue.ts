type QueueJob<T> = {
	fn: () => Promise<T>;
	resolve: (value: T) => void;
	reject: (err: unknown) => void;
};

export class AsyncQueue<T = unknown> {
    private _queue: QueueJob<T>[] = [];
    private _isProcessing: boolean = false;

    enqueue = (fn: () => Promise<T>) => {
        return new Promise<T>((resolve, reject) => {
            this._queue.push({ fn, resolve, reject });
            if (!this._isProcessing) void this._process();
        })
    }

    private _process = async () => {
        this._isProcessing = true;

        while (this._queue.length > 0) {
            const job = this._queue.shift();

            if (!job) continue;

            try {
                const result = await job.fn();
                job.resolve(result);
            } catch (err) {
                job.reject(err);
            }
        }

        this._isProcessing = false;
    }
}
