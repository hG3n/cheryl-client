import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {MenuItem} from '../lib/Menu';

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

    // title
    @Input('title') title = '';

    // dropdown menu options
    @Input('options') options: MenuItem[];

    // icon name
    @Input('icon') icon: string;

    // show selected option
    @Input('show-selected') show_selected: boolean = false;

    // selected output
    @Output('onOptionSelected') option_selected = new EventEmitter<string>();

    @ViewChild('dropdown', {static: true}) dropdown_container: ElementRef;

    // visibility of the component
    public visible = false;

    public last_selected: string = '';

    /**
     * c'tor
     */
    constructor(private element_ref: ElementRef,
                private renderer: Renderer2) {
    }

    ngOnInit(): void {
    }

    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!this.element_ref.nativeElement.contains(event.target)) {
            this.visible = false;
        }
    }

    /**
     * Toggles the dropdowns visibility
     */
    toggleVisible() {
        this.visible = !this.visible;

        if (this.visible) {
            const container_rect = this.element_ref.nativeElement.getBoundingClientRect();
            const screen_width: number = window.screen.availWidth;
            const position = screen_width - container_rect.x < screen_width / 2 ? 'r' : 'l';

            switch (position) {
                case 'l':
                    // this.renderer.setStyle(this.dropdown_container.nativeElement, 'left', '100px');
                    break;
                case 'r':
                    const value = screen_width - container_rect.right;
                    this.renderer.setStyle(this.dropdown_container.nativeElement, 'right', `${value}px`);
                    break;
                default:
                    break;

            }
        }
    }

    /**
     * Executes callback on list element selected
     * @param item
     */
    elementSelected(item: MenuItem) {
        this.toggleVisible();
        this.option_selected.emit(item.tag);
        this.last_selected = '- ' + item.title;
    }

    /**
     * Reset the current state of the component
     */
    reset(): void {
        this.last_selected = '';
    }

}
