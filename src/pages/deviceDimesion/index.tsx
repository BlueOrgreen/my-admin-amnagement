import SideLeft from '@/components/SideLeft'
import './index.less'
import { SvgIcon } from '@/components/SvgIcon'

type IDeviceDimesionProps = {}

import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1-Title',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0-Title',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1-Title',
          },
          {
            value: 'leaf2',
            title: 'leaf2-Title',
          },
          {
            value: 'leaf3',
            title: 'leaf3',
          },
          {
            value: 'leaf4',
            title: 'leaf4',
          },
          {
            value: 'leaf5',
            title: 'leaf5',
          },
          {
            value: 'leaf6',
            title: 'leaf6',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf11',
            title: <b style={{ color: '#08c' }}>leaf11</b>,
          },
        ],
      },
    ],
  },
];

const valueMap = {};

function loops(list: any, parent: any) {
  return (list || []).map(({ children, value }: any) => {
    const node = (valueMap[value] = {
      parent,
      value
    });
    node.children = loops(children, node);
    return node;
  });
}

loops(treeData);

function getPath(value) {
  const path = [];
  let current = valueMap[value];
  while (current) {
    path.unshift(current.value);
    current = current.parent;
  }
  return path;
}


const MyTree: React.FC = () => {
  const [value, setValue] = useState<any>();

  const onChange = (newValue: any) => {
    console.log(newValue);
    console.log(valueMap);
    console.log(getPath(newValue));
    debugger
    setValue(newValue);
  };

  const onPopupScroll: TreeSelectProps['onPopupScroll'] = (e) => {
    console.log('onPopupScroll', e);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
      treeData={treeData}
      onPopupScroll={onPopupScroll}
    />
  );
};


const DeviceDimesion: React.FC<IDeviceDimesionProps> = () => {
    return (
        <div className="deviceDimesion">
            <SideLeft />
            <div className='contentRight'>
                    <SvgIcon fontSize={25} iconClass='refresh'/> 
                    <MyTree />
            </div>
        </div>
    )
}

export default DeviceDimesion