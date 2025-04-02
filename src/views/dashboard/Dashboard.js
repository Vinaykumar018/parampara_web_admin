import React, { useEffect, useState } from 'react'
import CountriesData from './CountriesData'
import DashboardCardSection from './DashboardCardSection'
import UsersData from './UsersData'
import VendorsData from './VendorsData'
import CommissionList from './ComissionList'
import UsersForm from './UsersForm'
import PanditRequestRangeSettings from './PanditRequestRangeSettings'
import PanditRequestRange from '../dashboardCards/PanditRequestRange'
import ComissionRange from '../dashboardCards/ComissionCard'

const Dashboard = () => {
   return (
    <>
      <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
        <DashboardCardSection className="mb-4" />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-8 col-sm-12">
        {/* <UsersForm />  */}
        <div className='row'>
          <div className='col-lg-6 col-md-12'>
            <PanditRequestRange/>
          </div>
          <div className='col-lg-6 col-md-12'>
            <ComissionRange/>
          </div>
        </div>
        </div>        
        <div className="col-md-4 col-sm-12">
        <UsersForm />
        </div>
        <div className="col-md-6 col-sm-12">
        <UsersData />
        </div> 
      </div>
      {/* <div className="row mb-4">
        <div className="col-12">
          <CountriesData />
        </div>
      </div> */}

      {/* Row 3 - Vendors Data Section */}
      <div className="row mb-4">
        <div className="col-12">
          <VendorsData />
        </div>
      </div>

      {/* Row 4 - Users Data and Users Form Section */}
     

      {/* Row 5 - Commission List Section */}
      <div className="row mb-4">
        <div className="col-12">
          <CommissionList />
        </div>
      </div>
        </div>
    </>
  )
}

export default Dashboard