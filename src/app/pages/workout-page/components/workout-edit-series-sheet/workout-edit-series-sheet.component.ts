import { Component, ViewChild } from '@angular/core';
import { BottomSheetComponent } from "../../../../shared/components/bottom-sheet/bottom-sheet.component";

@Component({
    selector: 'app-workout-edit-series-sheet',
    standalone: true,
    templateUrl: './workout-edit-series-sheet.component.html',
    styleUrl: './workout-edit-series-sheet.component.scss',
    imports: [BottomSheetComponent]
})
export class WorkoutEditSeriesSheetComponent {
  @ViewChild('editSheet') private editSheet: BottomSheetComponent | undefined;

  protected onCloseHandler(): void{
    if(this.editSheet) this.editSheet.onCloseHandler();
  }
}
