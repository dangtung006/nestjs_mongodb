import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('send-mail')
export class EmailConsumer {
    constructor() {}

    @Process('register')
    async registerEmail(job: Job<unknown>) {
        //do job :
        console.log(job.data);
    }
}