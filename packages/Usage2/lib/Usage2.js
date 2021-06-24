var React = require('react');
var Button = require('@cdm-lerna-test/button');
var Avatar = require('@cdm-lerna-test/avatar');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var Avatar__default = /*#__PURE__*/_interopDefaultLegacy(Avatar);

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["showButton", "showAvatar"];

var CustomUsage2 = function CustomUsage2(_ref) {
  var _ref$showButton = _ref.showButton,
      showButton = _ref$showButton === void 0 ? true : _ref$showButton,
      _ref$showAvatar = _ref.showAvatar,
      showAvatar = _ref$showAvatar === void 0 ? true : _ref$showAvatar;
      _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/React__default['default'].createElement("div", null, showButton && /*#__PURE__*/React__default['default'].createElement(Button__default['default'], {
    buttonText: "Button for Usage2!"
  }), showAvatar && /*#__PURE__*/React__default['default'].createElement(Avatar__default['default'], {
    src: "https://placedog.net/540/320"
  }));
};

module.exports = CustomUsage2;
//# sourceMappingURL=Usage2.js.map
