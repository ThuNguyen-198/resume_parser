import { HttpClient } from "@angular/common/http";
import { Job } from "./job.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({ providedIn: "root" })
export class JobService {

    private jobs: Job[] = [];
    private jobsUpdated = new Subject<Job[]>();
    constructor(private http: HttpClient) { }

    getJobs() {
        this.http.get<{ message: string, jobs: Job[] }>('http://localhost:3000/jobs')
            .subscribe((jobsData) => {
                this.jobs = jobsData.jobs;
                this.jobsUpdated.next([...this.jobs]);
            })
    }

    getJobUpdateListener() {
        return this.jobsUpdated.asObservable();
    }

    addJob(job: Job) {
        this.http.post<{ message: string }>('http://localhost:3000/jobs', job)
            .subscribe((responseData) => {
                console.log(responseData);
                this.jobs.push(job);
                this.jobsUpdated.next([...this.jobs]);
            })


    }

} 
