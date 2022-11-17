import { Component, OnInit } from '@angular/core';
import { Job as Job } from './job.model';
import { JobService as JobService } from './job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[] = []

  constructor(public jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((jobs: Job[]) => {
      this.jobs = jobs;
    });

  }


}
