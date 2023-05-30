import { Component } from '@angular/core';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-update-allocation',
  templateUrl: './update-allocation.component.html',
  styleUrls: ['./update-allocation.component.css'],
})
export class UpdateAllocationComponent {
  percentage: string;

  constructor(private memberService: MembersService) {}
  updateAllocation() {
    this.memberService.updateAllocation(this.percentage);
  }
}
