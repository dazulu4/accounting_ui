import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  template: `
    <button
      [attr.type]="type"
      [disabled]="disabled"
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
    >
      {{ label }}
    </button>
  `,
})
export class UiButtonComponent {
  @Input() label: string = 'Click';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
} 