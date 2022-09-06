import _ from "lodash";

export const modifyChartData = (_data) => {
  if (!_data) return;
  _data = _.orderBy(_data, ["name"], ["asc"]);
  let i = 0;
  while (i < _data.length - 1) {
    if (_data[i]?.name === _data[i + 1]?.name) {
      _data[i].Total += _data[i + 1].Total;
      _data.splice(i + 1, 1);
    } else i++;
  }

  return _data;
};
