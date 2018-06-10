import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const AdminHome = (props) => {

  return (
    <div>
      <h3>Welcome, {props.user.firstName} {props.user.lastName}</h3>
      <Link to="/admin/inventory">
        <button type="button">VIEW PRODUCT INVENTORY</button>
      </Link>
      <Link to="/admin/useraccounts">
        <button type="button">VIEW USER ACCOUNTS</button>
      </Link>
    </div>
  )
}

const mapState = state => ({ user: state.user })
export default connect(mapState)(AdminHome)