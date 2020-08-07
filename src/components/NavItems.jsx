import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const mapStateToProps = state => {
  return {
    user : state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout : () => dispatch(actions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(props => {
  let links = (
    <React.Fragment>
      <li className='NavItem'>
        <NavLink to='/' exact>
          Burger Builder
        </NavLink>
      </li>
      <li className='NavItem'>
        <NavLink to='/signin' onClick={props.onLogout}>
          Logout
        </NavLink>
      </li>
    </React.Fragment>
  );

  if (!props.user) {
    links = (
      <li className='NavItem'>
        <NavLink to='/signin'>LogIn/Register</NavLink>
      </li>
    );
  }

  return <ul id='NavItems'>{links}</ul>;
});
