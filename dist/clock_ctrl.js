'use strict';

System.register(['app/plugins/sdk', 'moment', 'lodash', './css/clock-panel.css!'], function (_export, _context) {
  "use strict";

  var PanelCtrl, moment, _, _createClass, panelDefaults, ClockCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      PanelCtrl = _appPluginsSdk.PanelCtrl;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_cssClockPanelCss) {}],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      panelDefaults = {
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

      _export('ClockCtrl', ClockCtrl = function (_PanelCtrl) {
        _inherits(ClockCtrl, _PanelCtrl);

        function ClockCtrl($scope, $injector) {
          _classCallCheck(this, ClockCtrl);

          var _this = _possibleConstructorReturn(this, (ClockCtrl.__proto__ || Object.getPrototypeOf(ClockCtrl)).call(this, $scope, $injector));

          _.defaultsDeep(_this.panel, panelDefaults);

          if (!(_this.panel.countdownSettings.endCountdownTime instanceof Date)) {
            _this.panel.countdownSettings.endCountdownTime = moment(_this.panel.countdownSettings.endCountdownTime).toDate();
          }

          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.events.on('panel-initialized', _this.render.bind(_this));
          return _this;
        }

        _createClass(ClockCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.addEditorTab('Options', 'public/plugins/nayar-divider-panel/editor.html', 2);
          }
        }, {
          key: 'link',
          value: function link(scope, elem) {
            var _this2 = this;

            this.events.on('render', function () {
              var $panelContainer = elem.find('.panel-container');

              if (_this2.panel.bgColor) {
                $panelContainer.css('background-color', _this2.panel.bgColor);
              } else {
                $panelContainer.css('background-color', '');
              }
            });
          }
        }]);

        return ClockCtrl;
      }(PanelCtrl));

      _export('ClockCtrl', ClockCtrl);

      ClockCtrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=clock_ctrl.js.map
