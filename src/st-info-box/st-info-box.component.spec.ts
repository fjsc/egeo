import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StInfoBoxComponent } from './st-info-box.component';
import { TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


let title: string = 'title';
let width: number = 100;
let height: number = 100;
let fixture: ComponentFixture<StInfoBoxComponent>;

describe('StInfoBoxComponent', () => {

    let comp: StInfoBoxComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [StInfoBoxComponent]
        });

        fixture = TestBed.createComponent(StInfoBoxComponent);
        comp = fixture.componentInstance;
    });

    describe('if title is not defined', () => {
        it('should throw an error', () => {
           expect(() => comp.ngOnInit()).toThrowError('st-info-box: title is a required field');
        });
    });

    describe('if title is defined', () => {
        beforeEach(() => {
            comp.title = title;
        });

        it('should not throw an error on init', () => {
            expect(() => comp.ngOnInit()).not.toThrowError();
        });

        it('if the width is defined, width, min-width and max-width styles must be defined', () => {
            comp.width = width;
            let result: any = comp.getStyles();
            expect(result.width).toEqual(`${width}px`);
            expect(result['min-width']).toBeDefined();
            expect(result['max-width']).toBeDefined();
        });

        it('if the height is defined, height, min-height and max height styles must be defined', () => {
            comp.height = height;
            let result: any = comp.getStyles();
            expect(result.height).toEqual(`${height}px`);
            expect(result['min-height']).toBeDefined();
            expect(result['max-height']).toBeDefined();
        });

        it('if icon is defined, an icon must be showed', () => {
            comp.icon = 'spark';
            fixture.detectChanges();
            let icon: DebugElement = fixture.debugElement.query(By.css('.st-info-box__header__icon'));
            expect(icon.nativeElement).toBeDefined();
        });
    });
});
