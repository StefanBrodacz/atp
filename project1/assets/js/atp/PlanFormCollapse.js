require('@webcomponents/webcomponentsjs/webcomponents-bundle');
import 'paper-collapse-item/paper-collapse-item';

import '@polymer/iron-icons/';
import '@polymer/iron-ajax';
import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-date-picker';

class PlanFormCollapse extends PolymerElement {
    static get is() {
        return 'plan-form-collapse';
    }

    static get template() {
        return html`

        <paper-collapse-item icon="icons:assignment" opened>
            <div slot="header">
            Planning
            </div>
            <div class="container-fluid">
            <div class="row">
                <div class="col-sm">
                    <paper-input always-float-label label="Plan Label"></paper-input>
                </div>
                <div class="col-sm-4">
                    <date-picker id="date-picker"></date-picker>
                </div>
            </div>
            </div>
        </paper-collapse-item>
        
    `;
    }
}

class DatePicker extends PolymerElement {
    static get is() {
        return 'date-picker';
    }

    static get template() {
        return html`
        <vaadin-date-picker show-week-numbers label="Plan start" class="date-picker"></vaadin-date-picker>

        `;
    }
}

customElements.define(DatePicker.is, DatePicker);
customElements.define(PlanFormCollapse.is, PlanFormCollapse);
// customElements.whenDefined('vaadin-date-picker').then(function() {
//     console.log('a')
//     let datepicker = document.querySelector('vaadin-date-picker');
//     datepicker.set('i18n.firstDayOfWeek', 2);
// });