import { Component } from '@angular/core';
import { MdSnackBar, MdDialog } from '@angular/material';
import { LayoutService } from '../../layout/layout.service';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog.component';
import { DialogResultExampleDialogComponent } from './dialog-result-example-dialog.component';

@Component({
  selector: 'my-ui-components',
  styles: [],
  templateUrl: './components.component.html',
})

export class UIComponentsComponent {
  constructor(public snackBar: MdSnackBar, public dialog: MdDialog, private layoutService: LayoutService) {}

  //
  activateLoader() {
    this.layoutService.updatePreloaderState('active');
  }
  hideLoader() {
    this.layoutService.updatePreloaderState('hide');
  }

  // Tooltips
  tooltipDirection = 'below';

  // SnackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openDialog() {
    this.dialog.open(DialogOverviewExampleDialogComponent);
  }
  selectedOption;
  openDialogWithAResult() {
    const dialogRef = this.dialog.open(DialogResultExampleDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.selectedOption = result;
    });
  }

  // Progress Bar, Spinner
  determinateValue = 30;
  determinateValue2 = 50;
}
