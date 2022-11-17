import { HttpClient } from "@angular/common/http";
import { Job } from "./job.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({ providedIn: "root" })
export class JobService {

    private jobs: Job[] = [];
    private jobsUpdated = new Subject<Job[]>();
    private msg = 'a';
    constructor(private http: HttpClient) { }

    getJobs() {
        this.http.get<{ message: String, posts: Job[] }>('http://localhost:3000')
            .subscribe((jobsData) => {
                this.jobs = jobsData.posts;
                this.jobsUpdated.next([...this.jobs]);
            });

        return this.jobsUpdated.asObservable();
    }
} 
