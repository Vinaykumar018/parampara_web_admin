import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {CRow, CCol, CWidgetStatsB } from '@coreui/react'

import {
  
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol xs={3}>
        <CWidgetStatsB
          className="mb-3"
          color="primary"
          inverse
          progress={{ value: 75 }}
          text="Widget helper text"
          title="Widget title"
          value="89.9%"
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsB
          className="mb-3"
          color="info"
          inverse
          progress={{ value: 75 }}
          text="Widget helper text"
          title="Widget title"
          value="89.9%"
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsB
          className="mb-3"
          color="info"
          inverse
          progress={{ value: 75 }}
          text="Widget helper text"
          title="Widget title"
          value="89.9%"
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsB
          className="mb-3"
          color="info"
          inverse
          progress={{ value: 75 }}
          text="Widget helper text"
          title="Widget title"
          value="89.9%"
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsB
          className="mb-3"
          color="info"
          inverse
          progress={{ value: 75 }}
          text="Widget helper text"
          title="Widget title"
          value="89.9%"
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsB
          className="mb-3"
          color="info"
          inverse
          progress={{ value: 75 }}
          text="Widget helper text"
          title="Widget title"
          value="89.9%"
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
