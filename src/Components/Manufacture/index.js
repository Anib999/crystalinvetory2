import { Table, Space, Tag } from 'antd'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import PageHeader from '../Common/pageHeader'
// import { getItemUnitApi } from '../../services/itemUnitService';
import Edit from '../Common/Edit';
import Filter from '../Common/Filter';
import { getManuDetApi } from '../../services/itemManufactureService';
import { inventoryStat } from '../Common/StateList';

const Index = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [unitList, setunitList] = useState([])
  const [newunitList, setnewunitList] = useState([])

  useEffect(() => {
    getLabData()
  }, [])

  const getLabData = () => {
    dispatch(getManuDetApi((val) => {
      setunitList(val)
      setnewunitList(val)
    }))
  }

  const columns = [
    {
      title: 'Manufacture BY',
      dataIndex: 'ManufactureBY',
      key: 'ManufactureBY',
    },
    {
      title: 'Is Active',
      dataIndex: 'IsActive',
      key: 'IsActive',
      render: (text) => {
        let retText = 'Inactive'
        let retColor = 'red'
        if (text === true) {
          retText = 'Active'
          retColor = 'green'
        }
        return <Tag color={retColor}>{retText}</Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Edit onClick={() => history.push(`./manufacture/edit/${record.MId}`)}>Edit</Edit>
        </Space>
      )
    }
  ]
  const handleSearch = (val) => {
    if (val === undefined || val === '') {
      setnewunitList(unitList)
    } else {
      setnewunitList(val)
    }
  }

  return (
    <UnitContainer>
      <div className="maiTopContainer">
        <PageHeader
          buttonTitle='Add Manufacturer'
          pageTitle='Manufacturer'
          buttonOnClick={() => history.push({
            pathname: './manufacture/add',
            state: inventoryStat
          })}
        ></PageHeader>
        <Filter
        //   onSearch
        //   toCompareData={unitList}
          // forGoodsIn
          dataReturn={handleSearch}
        //   forUnits
        ></Filter>
      </div>
      <div className="tableisRes">
        <Table className='tableWidth'
          columns={columns}
          dataSource={newunitList}
        />
      </div>
    </UnitContainer>
  )
}

export default Index

const UnitContainer = styled.div``