import * as React from 'react';
import {Icon} from 'antd';
const IconText = (iconText: {
  type: string,
  text: string
}) => (
  <span>
    <Icon type={iconText.type} className={'mr8'}/>
    {iconText.text}
  </span>
);
export default IconText;