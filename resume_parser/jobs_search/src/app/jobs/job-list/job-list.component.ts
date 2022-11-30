import { Component, OnInit } from '@angular/core';
import { Job } from '../job.model';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  constructor(public jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobs();
    this.jobService.getJobUpdateListener()
      .subscribe((jobs: Job[]) => {
        this.jobs = jobs;
      })
  }

}
