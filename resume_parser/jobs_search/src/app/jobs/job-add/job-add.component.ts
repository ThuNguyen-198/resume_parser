import { Component, OnInit } from '@angular/core';
import { Job } from '../job.model';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {

  companyName = "";
  jobTitle = "";
  jobID = "";
  jobDescription = "";
  match = 0;


  constructor(public jobService: JobService) { }

  ngOnInit(): void {
  }

  onAddJob() {
    alert("account added!")
    const job: Job = {
      companyName: this.companyName,
      jobTitle: this.jobTitle,
      jobID: this.jobID,
      jobDescription: this.jobDescription,
      match: this.match
    }

    this.jobService.addJob(job);
  }
}
