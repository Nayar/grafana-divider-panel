import {PanelCtrl} from 'app/plugins/sdk';
import moment from 'moment';
import _ from 'lodash';
import './css/clock-panel.css!';

const panelDefaults = {
  mode: 'time',
  clockType: '24 hour',
  offsetFromUtc: null,
  offsetFromUtcMinutes: null,
  bgColor: null,
  countdownSettings: {
    endCountdownTime: moment().seconds(0).milliseconds(0).add(1, 'day').toDate(),
    endText: '00:00:00'
  },
  dateSettings: {
    showDate: false,
    dateFormat: 'YYYY-MM-DD',
    fontSize: '20px',
    fontWeight: 'normal'
  },
  timeSettings: {
    customFormat: 'HH:mm:ss',
    fontSize: '60px',
    fontWeight: 'normal'
  }
};

export class ClockCtrl extends PanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaultsDeep(this.panel, panelDefaults);

    if (!(this.panel.countdownSettings.endCountdownTime instanceof Date)) {
      this.panel.countdownSettings.endCountdownTime = moment(this.panel.countdownSettings.endCountdownTime).toDate();
    }

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('panel-initialized', this.render.bind(this));
  }

  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/nayar-divider-panel/editor.html', 2);
  }

  link(scope, elem) {
    this.events.on('render', () => {
      const $panelContainer = elem.find('.panel-container');

      if (this.panel.bgColor) {
        $panelContainer.css('background-color', this.panel.bgColor);
      } else {
        $panelContainer.css('background-color', '');
      }
    });
  }
}

ClockCtrl.templateUrl = 'module.html';
