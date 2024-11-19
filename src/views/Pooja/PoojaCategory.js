import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
  } from '@coreui/react'
  
const PoojaCategroy = () => {
    return(
        <>
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Add Pooja Category</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm method='post'>
                            <CRow>
                                <CCol xs>
                                    <CFormLabel>Pooja Category</CFormLabel>    
                                    <CFormInput placeholder="Enter Pooja Category" aria-label="First name" />
                                </CCol>
                                <CCol xs>
                                    <CFormLabel className="pt-2 mt-4"></CFormLabel>
                                    <CButton color="primary" className='mt-4' type="submit">
                                        Save
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Pooja Category</strong>
                    </CCardHeader>
                    <CCardBody>
                       
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        </>
    );
}
export default PoojaCategroy;