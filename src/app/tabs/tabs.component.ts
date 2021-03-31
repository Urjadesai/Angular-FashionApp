import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'tabs',
  template: `
  <ul class="nav nav-tabs">
    <li class="tab" *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
      <a href="#">{{tab.title}}</a>
    </li>
  </ul>
  <ng-content></ng-content>
`,
  styles: [
    `
  .tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
  }
  .tab a {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
  }
  `
  ]
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab: any) => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: any) {
    // deactivate all tabs
    this.tabs.toArray().forEach((tab: any) => tab.active = false);

    // activate the tab the user has clicked on.
    tab.active = true;
  }
}
